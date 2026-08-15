import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/offline_sync_service.dart';

class IncidentReportScreen extends StatefulWidget {
  const IncidentReportScreen({Key? key}) : super(key: key);

  @override
  _IncidentReportScreenState createState() => _IncidentReportScreenState();
}

class _IncidentReportScreenState extends State<IncidentReportScreen> {
  final _titleController = TextEditingController(text: 'Armed Hijacking Alert - Ore Corridor Highway');
  final _locationController = TextEditingController(text: 'Kilometer 42, Ore-Benin Expressway, Edo State');
  final _detailsController = TextEditingController(text: 'Two commercial logistics trucks blocked by armed suspects using makeshift spike strips.');

  void _submitReport() {
    final syncService = Provider.of<OfflineSyncService>(context, listen: false);

    syncService.enqueueItem('INCIDENT', {
      'title': _titleController.text,
      'location': _locationController.text,
      'details': _detailsController.text,
      'latitude': 6.335,
      'longitude': 5.603,
      'timestamp': DateTime.now().toIso8601String(),
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: syncService.isOnline ? Colors.emerald : Colors.amber,
        content: Text(
          syncService.isOnline
              ? '✔ INCIDENT REPORT SUBMITTED TO DISPATCH REAL-TIME'
              : '💾 INCIDENT REPORT QUEUED IN OFFLINE SYNC STORAGE',
        ),
      ),
    );

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF020617),
        title: const Text('MOBILE INCIDENT QUICK INTAKE', style: TextStyle(color: Colors.amber, fontSize: 13, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: const Color(0xFF020617), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.slate800)),
              child: Row(
                children: const [
                  Icon(Icons.my_location, color: Colors.emerald, size: 20),
                  SizedBox(width: 8),
                  Text('GPS AUTO-CAPTURED: 6.3350° N, 5.6030° E (Edo State)', style: TextStyle(color: Colors.emerald, fontSize: 11, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _titleController,
              style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(
                labelText: 'INCIDENT TITLE',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _locationController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                labelText: 'LOCATION NAME / LANDMARK',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _detailsController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              maxLines: 4,
              decoration: InputDecoration(
                labelText: 'FIELD NARRATIVE & DETAILS',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _submitReport,
              icon: const Icon(Icons.send, color: Colors.black),
              label: const Text('SUBMIT INCIDENT REPORT', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFD97706),
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
