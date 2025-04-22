import axios from 'axios';
import { toast } from 'react-toastify';

class NotificationService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
    this.subscribers = new Map();
  }

  // Subscribe to price alerts for a product
  async subscribeToPriceAlerts(productId, userId, targetPrice) {
    try {
      const response = await axios.post(`${this.baseURL}/notifications/subscribe`, {
        productId,
        userId,
        targetPrice,
      });

      if (response.data.success) {
        this.subscribers.set(productId, {
          userId,
          targetPrice,
          callback: this.handlePriceAlert.bind(this),
        });
        toast.success('Successfully subscribed to price alerts');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to subscribe to price alerts');
      throw error;
    }
  }

  // Unsubscribe from price alerts
  async unsubscribeFromPriceAlerts(productId, userId) {
    try {
      const response = await axios.post(`${this.baseURL}/notifications/unsubscribe`, {
        productId,
        userId,
      });

      if (response.data.success) {
        this.subscribers.delete(productId);
        toast.success('Successfully unsubscribed from price alerts');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to unsubscribe from price alerts');
      throw error;
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(userId, preferences) {
    try {
      const response = await axios.put(`${this.baseURL}/notifications/preferences`, {
        userId,
        preferences,
      });

      if (response.data.success) {
        toast.success('Notification preferences updated');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to update notification preferences');
      throw error;
    }
  }

  // Handle price alerts
  async handlePriceAlert(productId, currentPrice) {
    const subscription = this.subscribers.get(productId);
    if (!subscription) return;

    const { userId, targetPrice } = subscription;

    if (currentPrice <= targetPrice) {
      try {
        await this.sendPriceAlert(userId, productId, currentPrice, targetPrice);
      } catch (error) {
        console.error('Failed to send price alert:', error);
      }
    }
  }

  // Send price alert email
  async sendPriceAlert(userId, productId, currentPrice, targetPrice) {
    try {
      const response = await axios.post(`${this.baseURL}/notifications/send-alert`, {
        userId,
        productId,
        currentPrice,
        targetPrice,
      });

      if (response.data.success) {
        toast.success('Price alert sent successfully');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to send price alert');
      throw error;
    }
  }

  // Get notification history
  async getNotificationHistory(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/notifications/history/${userId}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch notification history');
      throw error;
    }
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId) {
    try {
      const response = await axios.put(`${this.baseURL}/notifications/${notificationId}/read`);
      if (response.data.success) {
        toast.success('Notification marked as read');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to mark notification as read');
      throw error;
    }
  }

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await axios.delete(`${this.baseURL}/notifications/${notificationId}`);
      if (response.data.success) {
        toast.success('Notification deleted');
      }
      return response.data;
    } catch (error) {
      toast.error('Failed to delete notification');
      throw error;
    }
  }

  // Start price monitoring
  startMonitoring() {
    // In a real application, you might want to use WebSocket or Server-Sent Events
    // for real-time price updates. This is a simplified example using polling.
    this.monitoringInterval = setInterval(async () => {
      for (const productId of this.subscribers.keys()) {
        try {
          const response = await axios.get(`${this.baseURL}/products/${productId}/price`);
          const currentPrice = response.data.price;
          await this.handlePriceAlert(productId, currentPrice);
        } catch (error) {
          console.error(`Failed to check price for product ${productId}:`, error);
        }
      }
    }, 300000); // Check every 5 minutes
  }

  // Stop price monitoring
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }
}
// ...existing code...

const notificationServiceInstance = new NotificationService();

export default notificationServiceInstance;
