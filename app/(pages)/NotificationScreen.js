import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: `"Your Order is Delivered"`,
      description: `"Your order #1234 has been delivered successfully."`,
      isRead: false,
      date: `"2025-06-13 08:30 AM"`,
    },
    {
      id: 2,
      title: `"New Offer Just for You!"`,
      description: `"Get 30% off your next purchase. Limited time offer!"`,
      isRead: false,
      date: `"2025-06-12 04:20 PM"`,
    },
    {
      id: 3,
      title: `"Reminder"`,
      description: `"Don’t forget to take your medicine today at 8:00 PM."`,
      isRead: true,
      date: `"2025-06-11 07:00 AM"`,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <TouchableOpacity onPress={markAllAsRead} style={styles.markAllBtn}>
        <Text style={styles.markAllText}>Mark all as read</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((notif) => (
          <View key={notif.id} style={[styles.card, notif.isRead && styles.readCard]}>
            <View style={styles.cardContent}>
              <Ionicons
                name={notif.isRead ? 'notifications-outline' : 'notifications'}
                size={20}
                color={notif.isRead ? '#9CA3AF' : '#3C9D8D'}
                style={{ marginRight: 10, marginTop: 4 }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.dateText}>{notif.date}</Text>
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.description}>{notif.description}</Text>
                {!notif.isRead ? (
                  <TouchableOpacity onPress={() => markAsRead(notif.id)}>
                    <Text style={styles.markAsReadText}>Mark as read</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.readText}>✓ Read</Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    color: '#3C9D8D',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  markAllBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  markAllText: {
    color: '#3C9D8D',
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  readCard: {
    backgroundColor: '#F3F4F6',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    color: '#4B5563',
    marginBottom: 8,
  },
  markAsReadBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#3C9D8D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  markAsReadText: {
    color: '#fff',
    fontSize: 14,
  },
  readText: {
    color: '#3C9D8D',
    fontSize: 14,
    fontWeight: '500',
  },
});
