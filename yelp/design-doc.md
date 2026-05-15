# Design Document: Personal Map With Local Database + Update Button

## 1. Overview

This project creates a self‑contained web application that:

- Displays all places you've visited/reviewed on an interactive map
- Stores all place data in a local database file (JSON or SQLite)
- Lets you add new places manually
- Lets you upload a new Yelp export to merge new data
- Provides an Update Map button that refreshes the map on demand
- Never scrapes Yelp or violates ToS
- Requires no spreadsheets and no external services

This system is private, local, and fully under your control.

## 2. System Architecture

### 2.1 Components

**Frontend Web App**
- HTML/JS/CSS
- Map rendering (Leaflet or Mapbox GL JS)
- UI for adding places
- UI for uploading Yelp export
- "Update Map" button

**Local Database**
- Option A: `places.json`
- Option B: `places.db` (SQLite)
- Stores all place metadata

**Backend Logic (Local Script or Local Web Server)**
- Reads/writes database
- Parses Yelp export
- Merges new entries
- Returns updated dataset to frontend

## 3. Data Model

### 3.1 Place Object

Each place entry contains:

```json
{
  "id": "unique-id",
  "name": "Business Name",
  "address": "123 Main St, City, State",
  "latitude": 00.0000,
  "longitude": -00.0000,
  "source": "yelp|manual",
  "date_added": "2026-05-14",
  "notes": "Optional review text"
}
```

### 3.2 Database Structure

If JSON:
```
places.json
[
  { place1 },
  { place2 },
  ...
]
```

If SQLite:
```
places.db
TABLE places (
  id TEXT PRIMARY KEY,
  name TEXT,
  address TEXT,
  latitude REAL,
  longitude REAL,
  source TEXT,
  date_added TEXT,
  notes TEXT
)
```

## 4. User Interface

### 4.1 Main Page Layout

**Left Sidebar**
- Update Map button
- Add New Place button
- Upload Yelp Export button
- List of all places

**Right Panel**
- Interactive map
- Markers for each place
- Click marker → show details

## 5. Core Features

### 5.1 Update Map Button

When clicked:
- Fetches the latest database
- Re-renders all markers
- Rebuilds the sidebar list
- Saves any new changes

This is instant and local.

### 5.2 Add New Place

User enters:
- Name
- Address
- Notes (optional)

System:
- Geocodes address (local geocoder or Mapbox API)
- Adds entry to database
- Refreshes map

### 5.3 Upload Yelp Export

User uploads the ZIP or JSON file.

System:
- Extracts `reviews.json` and/or `check_ins.json`
- Parses business names + addresses
- Geocodes missing coordinates
- Deduplicates entries
- Adds new ones to database
- Refreshes map

## 6. Update Logic

### 6.1 Deduplication

A new place is considered "new" if:
- No existing entry has the same name + address
- OR coordinates differ by > 50 meters

### 6.2 Merge Strategy

- Keep existing entries
- Add new ones
- Update fields only if new data is more complete

## 7. Optional Enhancements

- Tagging system (restaurants, parks, etc.)
- Color-coded markers
- Search bar
- Filters (by date, type, source)
- Export to CSV
- Dark mode

## 8. Security & Privacy

- All data stored locally
- No external servers
- No Yelp scraping
- No third-party tracking

## 9. Deployment Options

- Local HTML file (no server needed)
- Local Python server (Flask)
- Local Node.js server

## 10. Example User Flow

1. User opens the map page
2. Clicks Upload Yelp Export
3. Map populates with all past places
4. User visits a new place
5. User clicks Add New Place
6. Map updates instantly
7. User clicks Update Map anytime to refresh
