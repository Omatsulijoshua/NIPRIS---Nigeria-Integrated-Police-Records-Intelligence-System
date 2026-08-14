import 'package:flutter/material.dart';

class NiprisOfficerApp extends StatelessWidget {
  const NiprisOfficerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NIPRIS Officer Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFD97706),
          surface: Color(0xFF1E293B),
        ),
      ),
      home: const OfficerDutyHomeScreen(),
    );
  }
}

class OfficerDutyHomeScreen extends StatelessWidget {
  const OfficerDutyHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NIPRIS Mobile Terminal'),
        backgroundColor: const Color(0xFF020617),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.amber.shade900.withOpacity(0.3),
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: Colors.amber.shade700),
            ),
            child: const Center(
              child: Text(
                'RESTRICTED',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.amber),
              ),
            ),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: Cross-Start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: const Color(0xFF334155)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.shield_outlined, color: Color(0xFFD97706), size: 36),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('Officer Duty Status', style: TextStyle(color: Colors.grey, fontSize: 12)),
                      SizedBox(height: 2),
                      Text('ON DUTY — PATROL SCOPE', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('QUICK ACTIONS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
            const SizedBox(height: 12),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                children: [
                  _buildActionTile(Icons.search, 'Person Search'),
                  _buildActionTile(Icons.warning_amber, 'Active Warrants'),
                  _buildActionTile(Icons.videocam, 'Bodycam Ingest'),
                  _buildActionTile(Icons.report, 'Incident Report'),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile(IconData icon, String title) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFF334155)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: const Color(0xFFD97706), size: 32),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
        ],
      ),
    );
  }
}
