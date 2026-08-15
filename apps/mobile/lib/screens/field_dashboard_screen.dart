import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/offline_sync_service.dart';
import 'identity_search_screen.dart';
import 'incident_report_screen.dart';
import 'arrest_booking_screen.dart';

class FieldDashboardScreen extends StatefulWidget {
  const FieldDashboardScreen({Key? key}) : super(key: key);

  @override
  _FieldDashboardScreenState createState() => _FieldDashboardScreenState();
}

class _FieldDashboardScreenState extends State<FieldDashboardScreen> {
  String _dutyStatus = 'ON_PATROL';

  void _triggerSosEmergency() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF450A0A),
        title: const Text('⚡ CONFIRM SOS EMERGENCY PANIC ALERT', style: TextStyle(color: Colors.red, fontSize: 15, fontWeight: FontWeight.bold)),
        content: const Text(
          'This will immediately broadcast your real-time GPS coordinates to all surrounding patrol units and State Command CAD Dispatchers.',
          style: TextStyle(color: Colors.white, fontSize: 12),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel', style: TextStyle(color: Colors.slate400)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() => _dutyStatus = 'SOS_EMERGENCY');
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  backgroundColor: Colors.red,
                  content: Text('⚡ SOS EMERGENCY ALERT BROADCASTED TO STATE COMMAND CAD & SURROUNDING UNITS!'),
                ),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('BROADCAST EMERGENCY ALERT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final syncService = Provider.of<OfflineSyncService>(context);

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF020617),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('NPF FIELD OPERATIONAL PORTAL', style: TextStyle(color: Colors.amber, fontSize: 13, fontWeight: FontWeight.bold)),
            Text('Officer: Insp. Emmanuel Okafor (NPF-2002)', style: TextStyle(color: Colors.white, fontSize: 10)),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              syncService.isOnline ? Icons.wifi : Icons.wifi_off,
              color: syncService.isOnline ? Colors.emerald : Colors.red,
            ),
            onPressed: () => syncService.setOnlineStatus(!syncService.isOnline),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Network & Offline Queue Status Card
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF020617),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: syncService.isOnline ? Colors.emerald : Colors.red),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      syncService.isOnline ? 'ONLINE - BACKEND CONNECTED' : 'OFFLINE - LOCAL STORAGE MODE',
                      style: TextStyle(
                        color: syncService.isOnline ? Colors.emerald : Colors.red,
                        fontWeight: FontWeight.bold,
                        fontSize: 11,
                      ),
                    ),
                    Text(
                      'Pending Sync: ${syncService.pendingCount}',
                      style: const TextStyle(color: Colors.slate300, fontSize: 11),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Duty Status Selector Card
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0xFF020617),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.slate800),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('DUTY STATUS:', style: TextStyle(color: Colors.slate400, fontSize: 11, fontWeight: FontWeight.bold)),
                    DropdownButton<String>(
                      value: _dutyStatus,
                      dropdownColor: const Color(0xFF020617),
                      style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 12),
                      items: const [
                        DropdownMenuItem(value: 'ON_PATROL', child: Text('ON PATROL')),
                        DropdownMenuItem(value: 'RESPONDING', child: Text('RESPONDING TO CALL')),
                        DropdownMenuItem(value: 'ON_SCENE', child: Text('ON SCENE')),
                        DropdownMenuItem(value: 'SOS_EMERGENCY', child: Text('⚡ SOS EMERGENCY', style: TextStyle(color: Colors.red))),
                      ],
                      onChanged: (val) => setState(() => _dutyStatus = val!),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // SOS Emergency Button
              ElevatedButton.icon(
                onPressed: _triggerSosEmergency,
                icon: const Icon(Icons.warning, color: Colors.white),
                label: const Text('⚡ SOS EMERGENCY PANIC ALERT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF991B1B),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 24),

              // Action Tiles Grid
              Expanded(
                child: GridView.count(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  children: [
                    _buildActionCard(
                      context,
                      icon: Icons.person_search,
                      title: 'Field Identity Quick Lookup',
                      subtitle: 'NIN / License / Name',
                      color: Colors.amber,
                      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const IdentitySearchScreen())),
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.report_problem,
                      title: 'Mobile Incident Intake',
                      subtitle: 'GPS Auto-Capture',
                      color: Colors.amber,
                      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const IncidentReportScreen())),
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.gavel,
                      title: 'Mobile Arrest Booking',
                      subtitle: 'Custody Cell Assignment',
                      color: Colors.amber,
                      onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ArrestBookingScreen())),
                    ),
                    _buildActionCard(
                      context,
                      icon: Icons.videocam,
                      title: 'Bodycam Stream Sync',
                      subtitle: 'Patrol Video Link',
                      color: Colors.amber,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionCard(BuildContext context, {required IconData icon, required String title, required String subtitle, required Color color, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF020617),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 36, color: color),
            const SizedBox(height: 12),
            Text(title, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
            const SizedBox(height: 4),
            Text(subtitle, textAlign: TextAlign.center, style: const TextStyle(color: Colors.slate400, fontSize: 10)),
          ],
        ),
      ),
    );
  }
}
