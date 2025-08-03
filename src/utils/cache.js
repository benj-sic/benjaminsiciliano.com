// Advanced Caching System for Benjamin Siciliano Website
// Handles network data, user preferences, performance metrics, and asset caching

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.storage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
    this.maxCacheSize = 50; // Maximum number of cached items
    this.cacheExpiry = {
      network: 24 * 60 * 60 * 1000, // 24 hours
      userPrefs: 30 * 24 * 60 * 60 * 1000, // 30 days
      performance: 60 * 60 * 1000, // 1 hour
      assets: 7 * 24 * 60 * 60 * 1000, // 7 days
      search: 10 * 60 * 1000, // 10 minutes
      theme: 24 * 60 * 60 * 1000, // 24 hours
    };
  }

  // Generate cache key with type and identifier
  generateKey(type, identifier) {
    return `${type}:${identifier}`;
  }

  // Set cache item with expiry
  set(type, identifier, data, customExpiry = null) {
    const key = this.generateKey(type, identifier);
    const expiry = customExpiry || this.cacheExpiry[type] || this.cacheExpiry.network;
    
    const cacheItem = {
      data,
      timestamp: Date.now(),
      expiry,
      type
    };

    // Store in memory cache
    this.cache.set(key, cacheItem);
    
    // Store in localStorage for persistence
    try {
      this.storage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Failed to store in localStorage:', error);
      this.evictOldest();
    }

    return true;
  }

  // Get cache item
  get(type, identifier) {
    const key = this.generateKey(type, identifier);
    
    // Try memory cache first
    let cacheItem = this.cache.get(key);
    
    // If not in memory, try localStorage
    if (!cacheItem) {
      try {
        const stored = this.storage.getItem(key);
        if (stored) {
          cacheItem = JSON.parse(stored);
          // Load into memory cache
          this.cache.set(key, cacheItem);
        }
      } catch (error) {
        console.warn('Failed to retrieve from localStorage:', error);
        return null;
      }
    }

    if (!cacheItem) return null;

    // Check if expired
    if (Date.now() - cacheItem.timestamp > cacheItem.expiry) {
      this.delete(type, identifier);
      return null;
    }

    return cacheItem.data;
  }

  // Delete cache item
  delete(type, identifier) {
    const key = this.generateKey(type, identifier);
    this.cache.delete(key);
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    try {
      // Clear only our cache keys
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        if (key.includes(':')) {
          this.storage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  // Evict oldest items when cache is full
  evictOldest() {
    if (this.cache.size <= this.maxCacheSize) return;

    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toRemove = entries.slice(0, this.cache.size - this.maxCacheSize);
    toRemove.forEach(([key]) => {
      this.cache.delete(key);
      try {
        this.storage.removeItem(key);
      } catch (error) {
        console.warn('Failed to remove item during eviction:', error);
      }
    });
  }

  // Get cache statistics
  getStats() {
    const stats = {
      memorySize: this.cache.size,
      localStorageSize: 0,
      types: {}
    };

    try {
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        if (key.includes(':')) {
          const [type] = key.split(':');
          stats.types[type] = (stats.types[type] || 0) + 1;
          stats.localStorageSize++;
        }
      });
    } catch (error) {
      console.warn('Failed to get localStorage stats:', error);
    }

    return stats;
  }

  // Network-specific caching methods
  cacheNetworkState(filters, zoom, pan, theme) {
    const key = `${JSON.stringify(filters)}-${zoom}-${JSON.stringify(pan)}-${theme}`;
    return this.set('network', key, {
      filters,
      zoom,
      pan,
      theme,
      timestamp: Date.now()
    });
  }

  getNetworkState(filters, zoom, pan, theme) {
    const key = `${JSON.stringify(filters)}-${zoom}-${JSON.stringify(pan)}-${theme}`;
    return this.get('network', key);
  }

  // User preferences caching
  cacheUserPrefs(prefs) {
    return this.set('userPrefs', 'preferences', prefs);
  }

  getUserPrefs() {
    return this.get('userPrefs', 'preferences') || {};
  }

  // Search results caching
  cacheSearchResults(query, results) {
    return this.set('search', query.toLowerCase(), results);
  }

  getSearchResults(query) {
    return this.get('search', query.toLowerCase());
  }

  // Performance metrics caching
  cachePerformanceMetrics(metrics) {
    return this.set('performance', 'metrics', metrics);
  }

  getPerformanceMetrics() {
    return this.get('performance', 'metrics') || {};
  }

  // Theme-specific caching
  cacheThemeData(theme, data) {
    return this.set('theme', theme, data);
  }

  getThemeData(theme) {
    return this.get('theme', theme);
  }

  // Asset caching
  cacheAsset(url, data) {
    return this.set('assets', url, data);
  }

  getAsset(url) {
    return this.get('assets', url);
  }

  // Session-specific caching (cleared on page refresh)
  setSession(type, identifier, data) {
    const key = this.generateKey(type, identifier);
    this.sessionStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }

  getSession(type, identifier) {
    const key = this.generateKey(type, identifier);
    try {
      const stored = this.sessionStorage.getItem(key);
      return stored ? JSON.parse(stored).data : null;
    } catch (error) {
      console.warn('Failed to get session data:', error);
      return null;
    }
  }

  // Cache warming utilities
  warmCache() {
    // Pre-cache common network states
    const commonFilters = [
      { companies: true, universities: true, startups: true },
      { companies: true, universities: false, startups: true },
      { companies: false, universities: true, startups: true }
    ];

    commonFilters.forEach(filters => {
      this.cacheNetworkState(filters, 1, { x: 0, y: 0 }, 'dark');
      this.cacheNetworkState(filters, 1, { x: 0, y: 0 }, 'light');
    });

    // Pre-cache theme data
    this.cacheThemeData('dark', {});
    this.cacheThemeData('light', {});
  }

  // Cache health check
  healthCheck() {
    const stats = this.getStats();
    const health = {
      memoryUsage: stats.memorySize / this.maxCacheSize,
      localStorageUsage: stats.localStorageSize,
      types: stats.types,
      recommendations: []
    };

    if (health.memoryUsage > 0.8) {
      health.recommendations.push('Consider increasing maxCacheSize or implementing more aggressive eviction');
    }

    if (health.localStorageUsage > 100) {
      health.recommendations.push('High localStorage usage - consider clearing old cache entries');
    }

    return health;
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

// Export for use throughout the application
export default cacheManager;

// Export individual functions for convenience
export const {
  set,
  get,
  delete: deleteCache,
  clear,
  getStats,
  cacheNetworkState,
  getNetworkState,
  cacheUserPrefs,
  getUserPrefs,
  cacheSearchResults,
  getSearchResults,
  cachePerformanceMetrics,
  getPerformanceMetrics,
  cacheThemeData,
  getThemeData,
  cacheAsset,
  getAsset,
  setSession,
  getSession,
  warmCache,
  healthCheck
} = cacheManager; 