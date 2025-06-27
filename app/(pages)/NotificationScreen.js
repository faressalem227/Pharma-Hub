/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import { Navback, Loader } from '../../components';
import { SearchContext } from '../../context/SearchContext';
import api from '../../utilities/api';

// [
//     {
//       id: 1,
//       title: `"Your Order is Delivered"`,
//       description: `"Your order #1234 has been delivered successfully."`,
//       isRead: false,
//       date: `"2025-06-13 08:30 AM"`,
//     },
//     {
//       id: 2,
//       title: `"New Offer Just for You!"`,
//       description: `"Get 30% off your next purchase. Limited time offer!"`,
//       isRead: false,
//       date: `"2025-06-12 04:20 PM"`,
//     },
//     {
//       id: 3,
//       title: `"Reminder"`,
//       description: `"Don’t forget to take your medicine today at 8:00 PM."`,
//       isRead: true,
//       date: `"2025-06-11 07:00 AM"`,
//     },
//   ]

export default function NotificationScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const { notifications } = useContext(SearchContext);

  // console.log(notifications);

  return (
    <View className="flex-1 bg-white p-4">
      {/* <TouchableOpacity onPress={markAllAsRead} style={styles.markAllBtn}>
        <Text style={styles.markAllText}>Mark all as read</Text>
      </TouchableOpacity> */}

      <View className="mb-8 flex-row">
        <Navback title="Notifications" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {notifications.map((notif) => (
          <View key={notif.ID} style={[styles.card, notif.isRead && styles.readCard]}>
            <View className="">
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name={notif.isRead ? 'notifications-outline' : 'notifications'}
                  size={20}
                  color={notif.isRead ? '#9CA3AF' : '#3C9D8D'}
                />
                <Text style={styles.title}>{notif.Header}</Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.dateText}>{notif.date}</Text>
                <Text style={styles.description}>{notif.Body}</Text>
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
    borderRadius: 15,
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
