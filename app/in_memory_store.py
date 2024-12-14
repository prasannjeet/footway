import threading

class InMemoryStore:
    _instance = None
    _lock = threading.Lock()

    def __init__(self):
        # Initialize data only once (singleton)
        if not hasattr(self, 'data'):
            self.data = {}

    @staticmethod
    def get_instance():
        # Ensure thread-safe singleton initialization
        if InMemoryStore._instance is None:
            with InMemoryStore._lock:
                if InMemoryStore._instance is None:
                    InMemoryStore._instance = InMemoryStore()
        return InMemoryStore._instance

    def set_data(self, key, value):
        with InMemoryStore._lock:
            self.data[key] = value

    def get_data(self, key):
        with InMemoryStore._lock:
            return self.data.get(key)

    def get_all_data(self):
        with InMemoryStore._lock:
            return self.data