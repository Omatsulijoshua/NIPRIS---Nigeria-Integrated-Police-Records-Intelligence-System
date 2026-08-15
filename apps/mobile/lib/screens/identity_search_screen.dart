import 'package:flutter/material.dart';

class IdentitySearchScreen extends StatefulWidget {
  const IdentitySearchScreen({Key? key}) : super(key: key);

  @override
  _IdentitySearchScreenState createState() => _IdentitySearchScreenState();
}

class _IdentitySearchScreenState extends State<IdentitySearchScreen> {
  final _queryController = TextEditingController(text: '10928374829');
  final _purposeController = TextEditingController(text: 'On-scene traffic stop verification NPF 14');
  bool _searching = false;
  Map<String, dynamic>? _matchResult;

  void _executeSearch() async {
    if (_purposeController.text.trim().length < 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: Colors.red,
          content: Text('⚠️ MANDATORY AUDIT REQUIREMENT: State valid Operational Purpose Justification (min 10 chars).'),
        ),
      );
      return;
    }

    setState(() => _searching = true);
    await Future.delayed(const Duration(milliseconds: 700));

    setState(() {
      _searching = false;
      _matchResult = {
        'personId': 'person-chidi-001',
        'name': 'Chidi Okonkwo (alias "Chidi the Cobra")',
        'nin': '10928374829',
        'dob': '1988-04-12',
        'sex': 'MALE',
        'status': 'ACTIVE_ARREST_WARRANT',
        'warrantNumber': 'WAR-2026-EDO-98380',
        'risk': 'ARMED_AND_DANGEROUS',
      };
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF020617),
        title: const Text('FIELD IDENTITY QUICK LOOKUP', style: TextStyle(color: Colors.amber, fontSize: 13, fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF451A03),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.amber),
              ),
              child: const Text(
                '🔒 MANDATORY PURPOSE LOGGING: Every query is cryptographically appended to the National Police Audit Ledger with your Badge ID.',
                style: TextStyle(color: Colors.amber, fontSize: 11),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _queryController,
              style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(
                labelText: 'NIN / DRIVER LICENSE / VOTER ID / NAME',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _purposeController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              maxLines: 2,
              decoration: InputDecoration(
                labelText: 'OPERATIONAL PURPOSE RATIONALE (MANDATORY)',
                labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                filled: true,
                fillColor: const Color(0xFF020617),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _searching ? null : _executeSearch,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFD97706),
                padding: const EdgeInsets.symmetric(vertical: 14),
              ),
              child: _searching
                  ? const CircularProgressIndicator(color: Colors.black)
                  : const Text('SEARCH MASTER IDENTITY INDEX', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 24),

            if (_matchResult != null) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF020617),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.red),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(_matchResult!['name'], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(color: Colors.red, borderRadius: BorderRadius.circular(4)),
                          child: Text(_matchResult!['risk'], style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text('NIN: ${_matchResult!['nin']} | DOB: ${_matchResult!['dob']} | Sex: ${_matchResult!['sex']}', style: const TextStyle(color: Colors.slate400, fontSize: 11)),
                    const Divider(color: Colors.slate800, height: 20),
                    Row(
                      children: [
                        const Icon(Icons.warning_amber, color: Colors.amber, size: 20),
                        const SizedBox(width: 8),
                        Text('WARRANT ACTIVE: ${_matchResult!['warrantNumber']}', style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 12)),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
