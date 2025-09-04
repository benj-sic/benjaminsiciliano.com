/*
 * Copyright (c) 2025 Benjamin Siciliano
 * All rights reserved.
 * 
 * This file is part of the benjaminsiciliano.com project.
 * Unauthorized copying, modification, distribution, or use is strictly prohibited.
 * For licensing inquiries, contact: ben.siciliano@gmail.com
 */

// Performance Monitoring and Optimization for Benjamin Siciliano Website
// Tracks loading times, user interactions, and network performance

import cacheManager from './cache.js';

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: {},
      networkInteractions: {},
      userInteractions: {},
      memoryUsage: {},
      errors: []
    };
    
    this.startTime = performance.now();
    this.interactionCount = 0;
    this.isMonitoring = false;
  }

  // Start monitoring
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.startTime = performance.now();
    
    // Monitor page load performance
    this.monitorPageLoad();
    
    // Monitor memory usage
    this.monitorMemoryUsage();
    
    // Monitor errors
    this.monitorErrors();
    
    console.log('Performance monitoring started');
  }

  // Monitor page load performance
  monitorPageLoad() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      
      window.addEventListener('load', () => {
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;
        
        this.metrics.pageLoad = {
          totalLoadTime: loadTime,
          domReadyTime: domReady,
          firstPaint: firstPaint,
          timestamp: Date.now()
        };
        
        this.saveMetrics();
      });
    }
  }

  // Monitor memory usage
  monitorMemoryUsage() {
    if (window.performance && window.performance.memory) {
      setInterval(() => {
        const memory = window.performance.memory;
        this.metrics.memoryUsage = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          timestamp: Date.now()
        };
      }, 30000); // Check every 30 seconds
    }
  }

  // Monitor errors
  monitorErrors() {
    window.addEventListener('error', (event) => {
      this.metrics.errors.push({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: Date.now()
      });
      
      // Keep only last 10 errors
      if (this.metrics.errors.length > 10) {
        this.metrics.errors = this.metrics.errors.slice(-10);
      }
    });
  }

  // Track network interaction performance
  trackNetworkInteraction(action, duration, success = true) {
    if (!this.metrics.networkInteractions[action]) {
      this.metrics.networkInteractions[action] = [];
    }
    
    this.metrics.networkInteractions[action].push({
      duration,
      success,
      timestamp: Date.now()
    });
    
    // Keep only last 20 interactions per action
    if (this.metrics.networkInteractions[action].length > 20) {
      this.metrics.networkInteractions[action] = 
        this.metrics.networkInteractions[action].slice(-20);
    }
  }

  // Track user interaction performance
  trackUserInteraction(action, duration) {
    this.interactionCount++;
    
    if (!this.metrics.userInteractions[action]) {
      this.metrics.userInteractions[action] = [];
    }
    
    this.metrics.userInteractions[action].push({
      duration,
      timestamp: Date.now(),
      interactionNumber: this.interactionCount
    });
    
    // Keep only last 50 interactions per action
    if (this.metrics.userInteractions[action].length > 50) {
      this.metrics.userInteractions[action] = 
        this.metrics.userInteractions[action].slice(-50);
    }
  }

  // Measure function execution time
  measureExecution(func, name) {
    return (...args) => {
      const start = performance.now();
      const result = func(...args);
      const duration = performance.now() - start;
      
      this.trackUserInteraction(name, duration);
      return result;
    };
  }

  // Get performance statistics
  getStats() {
    const stats = {
      pageLoad: this.metrics.pageLoad,
      memoryUsage: this.metrics.memoryUsage,
      errorCount: this.metrics.errors.length,
      totalInteractions: this.interactionCount,
      networkStats: {},
      userStats: {}
    };

    // Calculate network interaction averages
    Object.keys(this.metrics.networkInteractions).forEach(action => {
      const interactions = this.metrics.networkInteractions[action];
      const avgDuration = interactions.reduce((sum, i) => sum + i.duration, 0) / interactions.length;
      const successRate = interactions.filter(i => i.success).length / interactions.length;
      
      stats.networkStats[action] = {
        averageDuration: avgDuration,
        successRate,
        totalInteractions: interactions.length
      };
    });

    // Calculate user interaction averages
    Object.keys(this.metrics.userInteractions).forEach(action => {
      const interactions = this.metrics.userInteractions[action];
      const avgDuration = interactions.reduce((sum, i) => sum + i.duration, 0) / interactions.length;
      
      stats.userStats[action] = {
        averageDuration: avgDuration,
        totalInteractions: interactions.length,
        lastInteraction: interactions[interactions.length - 1]?.timestamp
      };
    });

    return stats;
  }

  // Save metrics to cache
  saveMetrics() {
    const stats = this.getStats();
    cacheManager.cachePerformanceMetrics(stats);
  }

  // Get cached metrics
  getCachedMetrics() {
    return cacheManager.getPerformanceMetrics();
  }

  // Generate performance recommendations
  getRecommendations() {
    const stats = this.getStats();
    const recommendations = [];

    // Page load recommendations
    if (stats.pageLoad.totalLoadTime > 3000) {
      recommendations.push('Page load time is slow (>3s). Consider optimizing images and reducing bundle size.');
    }

    // Memory usage recommendations
    if (stats.memoryUsage.usedJSHeapSize > stats.memoryUsage.jsHeapSizeLimit * 0.8) {
      recommendations.push('High memory usage detected. Consider implementing memory cleanup and reducing object allocations.');
    }

    // Network interaction recommendations
    Object.keys(stats.networkStats).forEach(action => {
      const stat = stats.networkStats[action];
      if (stat.averageDuration > 1000) {
        recommendations.push(`Slow ${action} interactions (${stat.averageDuration.toFixed(0)}ms). Consider caching or optimization.`);
      }
      if (stat.successRate < 0.9) {
        recommendations.push(`Low success rate for ${action} (${(stat.successRate * 100).toFixed(0)}%). Check for errors.`);
      }
    });

    // User interaction recommendations
    Object.keys(stats.userStats).forEach(action => {
      const stat = stats.userStats[action];
      if (stat.averageDuration > 100) {
        recommendations.push(`Slow ${action} user interactions (${stat.averageDuration.toFixed(0)}ms). Consider optimization.`);
      }
    });

    return recommendations;
  }

  // Export performance data
  exportData() {
    return {
      metrics: this.metrics,
      stats: this.getStats(),
      recommendations: this.getRecommendations(),
      exportTime: Date.now()
    };
  }

  // Clear all metrics
  clear() {
    this.metrics = {
      pageLoad: {},
      networkInteractions: {},
      userInteractions: {},
      memoryUsage: {},
      errors: []
    };
    this.interactionCount = 0;
    this.startTime = performance.now();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export for use throughout the application
export default performanceMonitor;

// Export individual functions for convenience
export const {
  start,
  trackNetworkInteraction,
  trackUserInteraction,
  measureExecution,
  getStats,
  getRecommendations,
  exportData,
  clear
} = performanceMonitor; 