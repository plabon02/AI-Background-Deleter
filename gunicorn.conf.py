# Gunicorn configuration file
import multiprocessing

workers = 1  # Number of worker processes
bind = "0.0.0.0:${PORT:-5000}"  # Bind to the PORT environment variable or default to 5000
worker_class = "sync"
timeout = 120  # Timeout in seconds
keepalive = 5
threads = 3  # Number of threads per worker
