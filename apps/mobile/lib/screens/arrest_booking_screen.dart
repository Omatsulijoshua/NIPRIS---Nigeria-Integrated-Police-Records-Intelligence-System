import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/offline_sync_service.dart';

class ArrestBookingScreen extends StatefulWidget {
  const ArrestBookingScreen({Key? key}) : super(key: key);

  @override
  _ArrestBookingScreenState createState() => _ArrestBookingScreenState();
}

class _ArrestBookingScreenState extends State<ArrestBookingScreen> {
  final _suspectNameController = TextEditingController(text: 'Chidi Okonkwo');
  final _legalBasisController = TextEditingController(text: 'Warrant execution WAR-2026-EDO-98380 & Section 3 Police Act');
  final _cellController = TextEditingController(text: 'Benin Central Station - Holding Cell B');

  void _submitArrest() {
    final syncService = Provider.of<OfflineSyncService>(context, listen: false);

    syncService.enqueueItem('ARREST', {
      'suspectName': _suspectNameController.text,
      'legalBasis': _legalBasisController.text,
      'custodyCell': _cellController.text,
      'timestamp': DateTime.now().toIso8601String(),
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: syncService.isOnline ? Colors.emerald : Colors.amber,
        content: Text(
          syncService.isOnline
              ? '✔ CUSTODY ARREST RECORD TRANSMITTED TO STATION REGISTER'
              : '💾 ARREST BOOKING QUEUED IN OFFLINE SYNC STORAGE',
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
        title: const Text('MOBILE ARREST & CUSTODY BOOKING', style: TextStyle(color: Colors.amber, fontSize: 13, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: const Color(0xFF450A0A), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.red)),
              child: const Text(
                '⚖ CONSTITUTIONAL GUARDBAND: Arrest booking represents administrative custody ONLY. Arrest strictly DOES NOT imply guilt or criminal conviction.',
                style: TextStyle(color: Colors.red, fontSize: 11),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _suspectNameController,
              style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(
                labelText: 'SUSPECT FULL NAME',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _legalBasisController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                labelText: 'STATUTORY LEGAL BASIS FOR ARREST',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _cellController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                labelText: 'ASSIGNED STATION & HOLDING CELL',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _submitArrest,
              icon: const Icon(Icons.gavel, color: Colors.black),
              label: const Text('SUBMIT CUSTODY ARREST BOOKING', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
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
