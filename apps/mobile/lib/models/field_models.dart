enum FieldDutyStatus { ON_PATROL, RESPONDING, ON_SCENE, SOS_EMERGENCY }

enum SyncStatus { PENDING_SYNC, SYNCING, SYNCED, ERROR }

class FieldOfficerSession {
  final String officerId;
  final String badgeNumber;
  final String officerName;
  final String rank;
  final String state;
  final String station;

  FieldOfficerSession({
    required this.officerId,
    required this.badgeNumber,
    required this.officerName,
    required this.rank,
    required this.state,
    required this.station,
  });
}

class OfflineSyncItem {
  final String id;
  final String itemType; // 'INCIDENT' | 'ARREST' | 'DUTY_STATUS'
  final Map<String, dynamic> payload;
  final DateTime createdAt;
  SyncStatus syncStatus;

  OfflineSyncItem({
    required this.id,
    required this.itemType,
    required this.payload,
    required this.createdAt,
    this.syncStatus = SyncStatus.PENDING_SYNC,
  });
}

class FieldIdentityQuery {
  final String searchType; // 'NIN' | 'DRIVERS_LICENSE' | 'NAME'
  final String queryValue;
  final String operationalPurpose;
  final String officerId;

  FieldIdentityQuery({
    required this.searchType,
    required this.queryValue,
    required this.operationalPurpose,
    required this.officerId,
  });
}

class SosAlertPayload {
  final String alertId;
  final String officerId;
  final String badgeNumber;
  final String officerName;
  final double latitude;
  final double longitude;
  final String state;
  final String emergencyRationale;
  final DateTime timestamp;

  SosAlertPayload({
    required this.alertId,
    required this.officerId,
    required this.badgeNumber,
    required this.officerName,
    required this.latitude,
    required this.longitude,
    required this.state,
    required this.emergencyRationale,
    required this.timestamp,
  });
}
