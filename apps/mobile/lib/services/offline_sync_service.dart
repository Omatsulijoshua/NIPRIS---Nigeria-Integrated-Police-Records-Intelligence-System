import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/field_models.dart';

class OfflineSyncService extends ChangeNotifier {
  final List<OfflineSyncItem> _queue = [];
  bool _isOnline = true;

  List<OfflineSyncItem> get pendingItems => _queue.where((item) => item.syncStatus == SyncStatus.PENDING_SYNC).toList();
  bool get isOnline => _isOnline;
  int get pendingCount => pendingItems.length;

  void setOnlineStatus(bool online) {
    _isOnline = online;
    notifyListeners();
    if (_isOnline) {
      processSyncQueue();
    }
  }

  void enqueueItem(String itemType, Map<String, dynamic> payload) {
    final item = OfflineSyncItem(
      id: 'sync_${DateTime.now().millisecondsSinceEpoch}',
      itemType: itemType,
      payload: payload,
      createdAt: DateTime.now(),
      syncStatus: _isOnline ? SyncStatus.SYNCING : SyncStatus.PENDING_SYNC,
    );

    _queue.add(item);
    notifyListeners();

    if (_isOnline) {
      processSyncQueue();
    }
  }

  Future<void> processSyncQueue() async {
    for (var item in pendingItems) {
      item.syncStatus = SyncStatus.SYNCING;
      notifyListeners();

      // Simulate network request to NestJS backend
      await Future.delayed(const Duration(milliseconds: 500));

      item.syncStatus = SyncStatus.SYNCED;
      notifyListeners();
    }
  }
}
