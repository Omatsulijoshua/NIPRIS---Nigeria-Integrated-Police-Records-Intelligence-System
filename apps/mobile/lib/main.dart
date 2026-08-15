import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/offline_sync_service.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => OfflineSyncService()),
      ],
      child: const NiprisMobileApp(),
    ),
  );
}

class NiprisMobileApp extends StatelessWidget {
  const NiprisMobileApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NIPRIS Mobile Police Field Portal',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF0F172A),
        primaryColor: const Color(0xFFD97706),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFD97706),
          secondary: Color(0xFF0EA5E9),
          surface: Color(0xFF020617),
        ),
      ),
      home: const LoginScreen(),
    );
  }
}
