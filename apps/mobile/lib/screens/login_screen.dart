import 'package:flutter/material.dart';
import 'field_dashboard_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _badgeController = TextEditingController(text: 'NPF-2002');
  final _passwordController = TextEditingController(text: 'Password@123');
  final _totpController = TextEditingController(text: '492810');
  bool _isLoading = false;

  void _handleLogin() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 600));
    setState(() => _isLoading = false);

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const FieldDashboardScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.security, size: 64, color: Color(0xFFD97706)),
              const SizedBox(height: 16),
              const Text(
                'NIPRIS MOBILE POLICE FIELD PORTAL',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Nigeria Police Force Authorized Access Only',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.slate400, fontSize: 12),
              ),
              const SizedBox(height: 32),
              TextField(
                controller: _badgeController,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: InputDecoration(
                  labelText: 'OFFICER BADGE NUMBER',
                  labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                  filled: true,
                  fillColor: const Color(0xFF020617),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passwordController,
                obscureText: true,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: InputDecoration(
                  labelText: 'PASSWORD',
                  labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                  filled: true,
                  fillColor: const Color(0xFF020617),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _totpController,
                style: const TextStyle(color: Colors.white, fontSize: 14),
                decoration: InputDecoration(
                  labelText: 'TOTP 2FA AUTHENTICATOR CODE',
                  labelStyle: const TextStyle(color: Colors.amber, fontSize: 11),
                  filled: true,
                  fillColor: const Color(0xFF020617),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _isLoading ? null : _handleLogin,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFD97706),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: _isLoading
                    ? const CircularProgressIndicator(color: Colors.black)
                    : const Text(
                        'VERIFY BADGE & AUTHENTICATE',
                        style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
