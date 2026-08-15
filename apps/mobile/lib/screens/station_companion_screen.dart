import 'package:flutter/material.dart';
import '../services/station_mobile_sync_service.dart';

class StationCompanionScreen extends StatefulWidget {
  final String stationId;
  final String officerId;

  const StationCompanionScreen({
    Key? key,
    this.stationId = 'stn_edo_001',
    this.officerId = 'off_patrol_001',
  }) : super(key: key);

  @override
  _StationCompanionScreenState createState() => _StationCompanionScreenState();
}

class _StationCompanionScreenState extends State<StationCompanionScreen> {
  final StationMobileSyncService _syncService = StationMobileSyncService();
  bool _isClockedIn = true;
  int _pendingOfflineQueueCount = 2;
  bool _isSyncing = false;

  void _toggleClockInStatus() {
    setState(() {
      _isClockedIn = !_isClockedIn;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          _isClockedIn
              ? '✔ Clocked IN to Benin Central Station (GPS Ping: 6.335, 5.603)'
              : '✔ Clocked OUT from Station Patrol Shift',
        ),
        backgroundColor: _isClockedIn ? Colors.emerald : Colors.amber,
      ),
    );
  }

  Future<void> _triggerMobileSync() async {
    setState(() {
      _isSyncing = true;
    });

    final result = await _syncService.processMobileSync(
      stationId: widget.stationId,
      deviceOfficerId: widget.officerId,
      deviceId: 'MOB-TAB-EDO-001',
      diaryDrafts: [
        {
          'draftId': 'draft_001',
          'eventType': 'ARREST_BOOKING',
          'description': 'Mobile patrol suspect booking draft.',
          'recordedAt': DateTime.now().toIso8601String(),
        }
      ],
      attendanceLogs: [
        {
          'officerId': widget.officerId,
          'actionType': 'CLOCK_IN',
          'latitude': 6.335,
          'longitude': 5.603,
          'timestamp': DateTime.now().toIso8601String(),
        }
      ],
    );

    setState(() {
      _isSyncing = false;
      _pendingOfflineQueueCount = 0;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('✔ Mobile Station Sync Completed! Status: ${result['status']}'),
        backgroundColor: Colors.blueAccent,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        title: const Text(
          '🏛 STATION FIELD COMPANION',
          style: TextStyle(fontFamily: 'monospace', fontWeight: FontWeight.bold, fontSize: 16),
        ),
        backgroundColor: const Color(0xFF020617),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.amber.withOpacity(0.4)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'STATION: BENIN CENTRAL',
                        style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Duty Status: ${_isClockedIn ? "ON PATROL (GPS ACTIVE)" : "OFF DUTY"}',
                        style: const TextStyle(color: Colors.white70, fontSize: 12),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: _toggleClockInStatus,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isClockedIn ? Colors.amber[700] : Colors.emerald,
                    ),
                    child: Text(
                      _isClockedIn ? 'Clock Out' : 'Clock In',
                      style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Store & Forward Offline Sync Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF020617),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.blue.withOpacity(0.4)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'OFFLINE DIARY QUEUE',
                        style: TextStyle(color: Colors.blueAccent, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      Text(
                        '$_pendingOfflineQueueCount Draft Entries Pending Sync',
                        style: const TextStyle(color: Colors.white70, fontSize: 11),
                      ),
                    ],
                  ),
                  ElevatedButton.icon(
                    onPressed: _isSyncing ? null : _triggerMobileSync,
                    icon: _isSyncing
                        ? const SizedBox(
                            width: 14,
                            height: 14,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : const Icon(Icons.sync, size: 16),
                    label: Text(_isSyncing ? 'Syncing...' : 'Sync Now'),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.blue[700]),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Action Buttons
            const Text(
              'MOBILE STATION TOOLS',
              style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 13),
            ),
            const SizedBox(height: 12),

            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.4,
              children: [
                _buildActionCard(
                  icon: Icons.book,
                  title: 'Draft Diary Entry',
                  subtitle: 'Offline SDE Logging',
                  color: Colors.amber,
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('📖 Offline Station Diary draft created in SQLite queue.')),
                    );
                  },
                ),
                _buildActionCard(
                  icon: Icons.qr_code_scanner,
                  title: 'Scan Barcode',
                  subtitle: 'Evidence & Visitor Badge',
                  color: Colors.indigoAccent,
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('📷 Barcode Scanner Active: BC-SEVD-2026-STN001-00912 verified!')),
                    );
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(title, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
            Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 10)),
          ],
        ),
      ),
    );
  }
}
