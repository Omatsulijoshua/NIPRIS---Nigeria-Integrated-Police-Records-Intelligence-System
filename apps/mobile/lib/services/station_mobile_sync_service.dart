import 'dart:convert';

class StationMobileSyncService {
  final String apiBaseUrl;

  StationMobileSyncService({this.apiBaseUrl = 'http://localhost:3001/api/v1'});

  Future<Map<String, dynamic>> fetchMobileSnapshot(String stationId) async {
    return {
      'stationId': stationId,
      'stationCode': 'STN-EDO-BENIN-CENTRAL',
      'lga': 'Oredo LGA',
      'unitsCount': 4,
      'cellOccupancy': '12/20',
      'syncedAt': DateTime.now().toIso8601String(),
    };
  }

  Future<Map<String, dynamic>> processMobileSync({
    required String stationId,
    required String deviceOfficerId,
    required String deviceId,
    List<Map<String, dynamic>>? diaryDrafts,
    List<Map<String, dynamic>>? attendanceLogs,
    List<Map<String, dynamic>>? visitorScans,
  }) async {
    return {
      'stationId': stationId,
      'deviceId': deviceId,
      'processedDiaryDraftsCount': diaryDrafts?.length ?? 0,
      'processedAttendanceLogsCount': attendanceLogs?.length ?? 0,
      'processedVisitorScansCount': visitorScans?.length ?? 0,
      'syncTimestamp': DateTime.now().toIso8601String(),
      'status': 'SUCCESS',
    };
  }
}
