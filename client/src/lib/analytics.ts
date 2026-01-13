/**
 * Analytics utility for tracking user actions and metrics
 * Currently logs to console - can be extended to send to analytics services
 */

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  /**
   * Track a custom event
   */
  track(event: string, properties?: Record<string, any>) {
    const eventData: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date(),
    };

    this.events.push(eventData);

    // Console logging with styling
    console.group(`📊 Analytics Event: ${event}`);
    console.log('Properties:', properties);
    console.log('Timestamp:', eventData.timestamp.toISOString());
    console.groupEnd();
  }

  /**
   * Track product upload
   */
  trackProductUpload(category: string, productName: string) {
    this.track('Product Uploaded', {
      category,
      productName,
      totalUploads: this.getProductUploadCount() + 1,
    });
  }

  /**
   * Track AI classification
   */
  trackClassification(category: string, confidence: number, imageUrl: string) {
    this.track('AI Classification', {
      category,
      confidence,
      confidencePercentage: `${(confidence * 100).toFixed(1)}%`,
      imageUrl: imageUrl.substring(0, 50) + '...',
    });

    // Log statistics
    this.logClassificationStats(category, confidence);
  }

  /**
   * Track industry/category usage
   */
  trackIndustryUsage(category: string) {
    this.track('Industry Used', {
      category,
      popularityRank: this.getIndustryRank(category),
    });
  }

  /**
   * Get total product upload count
   */
  getProductUploadCount(): number {
    return this.events.filter(e => e.event === 'Product Uploaded').length;
  }

  /**
   * Get most popular industries
   */
  getMostPopularIndustries(): Array<{ category: string; count: number }> {
    const categoryCounts = new Map<string, number>();

    this.events
      .filter(e => e.event === 'Product Uploaded' || e.event === 'Industry Used')
      .forEach(e => {
        const category = e.properties?.category;
        if (category) {
          categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
        }
      });

    return Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get average classification confidence
   */
  getAverageConfidence(): number {
    const classifications = this.events.filter(e => e.event === 'AI Classification');
    if (classifications.length === 0) return 0;

    const total = classifications.reduce((sum, e) => sum + (e.properties?.confidence || 0), 0);
    return total / classifications.length;
  }

  /**
   * Get classification confidence scores
   */
  getConfidenceScores(): number[] {
    return this.events
      .filter(e => e.event === 'AI Classification')
      .map(e => e.properties?.confidence || 0);
  }

  /**
   * Log classification statistics
   */
  private logClassificationStats(category: string, confidence: number) {
    const scores = this.getConfidenceScores();
    const avg = this.getAverageConfidence();

    console.group('📈 Classification Statistics');
    console.log('Current:', `${(confidence * 100).toFixed(1)}%`);
    console.log('Average:', `${(avg * 100).toFixed(1)}%`);
    console.log('Total Classifications:', scores.length);
    console.groupEnd();
  }

  /**
   * Get industry rank
   */
  private getIndustryRank(category: string): number {
    const popular = this.getMostPopularIndustries();
    const index = popular.findIndex(i => i.category === category);
    return index >= 0 ? index + 1 : popular.length + 1;
  }

  /**
   * Log summary statistics
   */
  logSummary() {
    const popular = this.getMostPopularIndustries();

    console.group('📊 Analytics Summary');
    console.log('Total Products Uploaded:', this.getProductUploadCount());
    console.log('Total Classifications:', this.getConfidenceScores().length);
    console.log('Average Confidence:', `${(this.getAverageConfidence() * 100).toFixed(1)}%`);
    console.log('Most Popular Industries:');
    popular.slice(0, 5).forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.category}: ${item.count} uses`);
    });
    console.groupEnd();
  }
}

// Export singleton instance
export const analytics = new Analytics();
