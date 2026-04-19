// Extended ward knowledge base — combines structured data with full website content
// This serves as the core knowledge for both the Staff Assistant and Constituent Bot

export const wardKnowledgeText = `
=== 48TH WARD OFFICE INFO ===
Alderwoman: Leni Manaa-Hoppenworth
Office Address: 1129 W Bryn Mawr, Chicago, IL 60660
Phone: 773-784-5277
Email: info@the48thward.org
Walk-in Hours: Mon-Thurs 10am-5pm, Fri 10am-3pm
Closed on Chicago City Holidays
Website: the48thward.org
Instagram: @the48thward
Newsletter Signup: https://mailchi.mp/the48thward/newsletter-signup

=== STAFF ===
- Chief of Staff: Nicole Sheldrick
- Communications Director: Audrey Champelli
- Development Director: Agnes Chan
- Operations staff: Angel Rubi Navarijo, Conor Hart, Genesis

=== NEIGHBORHOODS ===
The 48th Ward covers Edgewater, Andersonville, and parts of Uptown in Chicago's north side.
- Edgewater: Lakefront community known for diverse housing, parks, and the Lakefront Trail
- Andersonville: Historic Swedish neighborhood known for local businesses, restaurants, and cultural institutions
- Uptown: Arts and entertainment district with diverse community

=== SERVICE REQUESTS ===
- Ward Service Requests: the48thward.org/service-request
- 311 (non-emergency city services): Dial 3-1-1, visit 311.chicago.gov, or use CHI 311 app
- 211 (health/social services): Dial 2-1-1 or visit 211metrochicago.org
- Emergency: Call 911
- Mental Health Crisis: 988 Suicide & Crisis Lifeline (call/text 988)
- Poison Control: 1-800-222-1222

=== PERMITS & SERVICES ===
- Block Party Permits: the48thward.org/block-party
- Moving Signs (free, non-enforceable): the48thward.org/moving-signs — pick up at office
- Yard Sale Permits (free): the48thward.org/yard-sale-form
- Speed Humps: Need 65 signatures, submit to development@the48thward.org
- Parking Exceptions: Contact office via service request
- Tree Trimming: File 311 for emergencies
- Street Cleaning: Schedule at the48thward.org/blog/street-sweeping, begins April 1
- Invite the Alderwoman: the48thward.org/invite-the-alderwoman
- Volunteer: the48thward.org/volunteer-signup
- Internships: the48thward.org/internship-opportunities

=== ZONING & DEVELOPMENT ===
- Zoning information: the48thward.org/zoning-and-development
- Participatory Budgeting: the48thward.org/participatory-budgeting
  - In PB, community members decide how to spend ward infrastructure budget ($1M)
  - 2026 PB Winners: School Pedestrian Safety, Project Sidewalk, Swift Nature Play Area, Lakefront Trail Placemaking, Residential Pedestrian Safety, Public Art
  - 1,277 votes received in 2026 (300+ increase from 2025)
  - Submit project ideas at: the48thward.org/menu-repair-requests
- Liquor Licenses: the48thward.org/liquor-licenses
- Menu/Repair Requests: the48thward.org/menu-repair-requests

=== SAFETY & POLICING ===
- Emergency: Call 911
- 48th Ward includes Police Districts 20 and 24
- Find your police beat: operations.chicagopolice.org/FindMyDistrict
- Vision Zero: Zero pedestrian fatalities in 48th Ward in 2024, 2025, and 2026
- Accessible Pedestrian Signals (APS): $1,080,000 secured for 6 new APS installations in 2026
  New locations: Sheridan & Balmoral, Sheridan & Glenlake, Sheridan & Argyle, Broadway & Balmoral, Broadway & Argyle, Broadway & Ainslie

=== 2026 CONSTRUCTION ===
Q2 (April-June):
- Arterial Lighting Sheridan (Catalpa to Berwyn)
- Ridge/Wayne Pedestrian Hybrid Beacon
- Broadway Refuge Islands (Hood, Rosedale, Norwood)
- Berwyn Greenway Pavement Markings
- Street Resurfacing: Ardmore, Glenwood (multiple sections), Balmoral
- Alley Resurfacing: Multiple locations
- Detached Bump Outs at Clark & Gregory
Q3 (July-September):
- DWM Water Main Project - Sheridan/Bryn Mawr
- Raised Intersections near Senn (Thorndale/Glenwood & Ardmore/Glenwood)
- Under-L Activation
- Green Alleys: Multiple locations
Q4 (October-December):
- Elise Malary Plaza
- People's Gas System Improvement Projects
- Curb Extensions at Foster & Wayne
For construction questions: 773-784-5277 or info@the48thward.org
Track projects: ChiStreetWork (chistreetwork.chicago.gov)

=== RECENT DEVELOPMENTS ===
- Emanuel Congregation Redevelopment: Proposed development at 5959 N Sheridan Rd, 305 public comments received
- 1527 W Edgewater: Zoning change RS-3 to RM-4.5 approved
- Thorndale Commercial Corridor: Revitalization efforts underway
- Bryn Mawr Historic District: Landmarking effort in progress
- Perkins-Nordine House (6106 N Kenmore): Selected for 2026 Chicago Landmark Award

=== COMMUNITY HIGHLIGHTS ===
- 35 businesses won Reader Best of Chicago 2025 awards
  Notable winners: Alamo Shoes, Women and Children First, Gethsemane Garden Center, Chicagoland Games Dice Dojo, Cowboys and Astronauts, Andersonville Galleria
- Andersonville voted Runner-Up for Best North Side Neighborhood
- 48th Ward Black-Owned Business Guide available on website
- Street Sweeping begins April 1 annually

=== WARD NIGHTS ===
- Regular community meetings where neighbors discuss local issues
- Recent topics: zoning, development, housing, affordable housing, parks
- Check calendar for next Ward Night: the48thward.org/calendar

=== LAND ACKNOWLEDGMENT ===
The 48th Ward acknowledges the Kiikaapoi, Peoria, Kaskaskia, Potawatomi, and Myaamia nations on whose land we live and work. We pay respects to their elders past, present, and emerging.

=== BLOG CATEGORIES ===
City Council, Construction, Development, Did You Know?, Events, Get Involved, Health & Safety, Infrastructure, Office Info, Press Releases, Ward Nights
`;

// Additional knowledge that staff can upload at runtime (stored in memory)
let additionalKnowledge = '';

export function getAdditionalKnowledge() {
  return additionalKnowledge;
}

export function setAdditionalKnowledge(text) {
  additionalKnowledge = text;
}

export function appendKnowledge(text) {
  additionalKnowledge += '\n\n' + text;
}

export function getFullKnowledge() {
  return wardKnowledgeText + (additionalKnowledge ? '\n\n=== ADDITIONAL UPLOADED KNOWLEDGE ===\n' + additionalKnowledge : '');
}
