document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const customUploadBtn = document.getElementById('custom-upload-btn');
    const imagePreview = document.getElementById('image-preview');
    const resultImage = document.getElementById('result-image');
    const submitBtn = document.getElementById('submit-btn');
    const downloadBtn = document.getElementById('download-btn');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Trigger hidden file input when custom button is clicked
    customUploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                resultImage.src = ""; // Clear previous result
                submitBtn.disabled = false; // Enable submit button
                downloadBtn.style.display = 'none'; // Hide download button
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files[0]) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Show loader, disable buttons
        loadingSpinner.style.display = 'block';
        submitBtn.disabled = true;
        customUploadBtn.disabled = true;

        try {
            const response = await fetch('/remove-bg', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            resultImage.src = url;
            downloadBtn.href = url;
            downloadBtn.style.display = 'inline-block'; // Show download button

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the image. Please try again.');
        } finally {
            // Hide loader, re-enable buttons
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
            customUploadBtn.disabled = false;
        }
    });

    // Image Comparison Slider Logic
    const sliderContainer = document.querySelector('.image-slider-container');
    if (sliderContainer) {
        const comparisonImage = sliderContainer.querySelector('.comparison-image');
        const sliderHandle = sliderContainer.querySelector('.slider-handle');
        const handleCircle = sliderHandle.querySelector('.handle-circle');

        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
            if (handleCircle) {
                handleCircle.style.backgroundColor = '#00ff87'; // Highlight circle
            }
        };

        const stopDrag = () => {
            isDragging = false;
            if (handleCircle) {
                handleCircle.style.backgroundColor = 'white'; // Reset circle color
            }
        };

        const onDrag = (e) => {
            if (!isDragging) return;

            // Prevent default actions like text selection
            e.preventDefault();

            // Get the position of the mouse or touch
            let clientX = e.clientX || (e.touches && e.touches[0].clientX);
            if (typeof clientX === 'undefined') return;

            const rect = sliderContainer.getBoundingClientRect();
            let offsetX = clientX - rect.left;

            // Clamp the offset within the container bounds
            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width) offsetX = rect.width;

            const percentage = (offsetX / rect.width) * 100;

            sliderHandle.style.left = `${percentage}%`;
            comparisonImage.style.width = `${percentage}%`;
        };

        // Mouse events
        sliderContainer.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', onDrag);

        // Touch events for mobile
        sliderContainer.addEventListener('touchstart', startDrag);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', onDrag);
    }
});
