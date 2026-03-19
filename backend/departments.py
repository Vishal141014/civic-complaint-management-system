"""
Delhi Government Departments Configuration
This file contains all 15 Delhi departments with their categories
"""

DELHI_DEPARTMENTS = [
    {
        "id": "jal_board",
        "name": "Delhi Jal Board (DJB)",
        "categories": [
            "Water Supply",
            "Sewage",
            "Pipeline Leak",
            "Water Quality",
            "Borewell"
        ]
    },
    {
        "id": "pwd",
        "name": "Public Works Department (PWD)",
        "categories": [
            "Road Repair",
            "Pothole",
            "Bridge",
            "Footpath",
            "Flyover"
        ]
    },
    {
        "id": "bses_rajdhani",
        "name": "BSES Rajdhani Power Limited",
        "categories": [
            "Power Cut",
            "Electric Pole",
            "Street Light",
            "Meter Issue",
            "Wire Hanging"
        ]
    },
    {
        "id": "bses_yamuna",
        "name": "BSES Yamuna Power Limited",
        "categories": [
            "Power Cut",
            "Electric Pole",
            "Street Light",
            "Meter Issue",
            "Wire Hanging"
        ]
    },
    {
        "id": "mcd",
        "name": "Municipal Corporation of Delhi (MCD)",
        "categories": [
            "Garbage Collection",
            "Drain Overflow",
            "Stray Animals",
            "Building Demolition",
            "Sanitation",
            "Park Maintenance"
        ]
    },
    {
        "id": "dda",
        "name": "Delhi Development Authority (DDA)",
        "categories": [
            "Park",
            "Playground",
            "Encroachment",
            "Housing",
            "Land Dispute"
        ]
    },
    {
        "id": "delhi_police",
        "name": "Delhi Police",
        "categories": [
            "Security",
            "Theft",
            "Traffic",
            "Eve Teasing",
            "Noise Complaint",
            "Missing Person"
        ]
    },
    {
        "id": "dimts",
        "name": "Delhi Integrated Multi-Modal Transit (DIMTS)",
        "categories": [
            "Bus Stop",
            "DTC Bus Issue",
            "Auto Rickshaw",
            "Road Accident"
        ]
    },
    {
        "id": "gnctd_health",
        "name": "Delhi Health Department (GNCTD)",
        "categories": [
            "Government Hospital",
            "Dispensary",
            "Medicine Shortage",
            "Ambulance",
            "Mohalla Clinic"
        ]
    },
    {
        "id": "delhi_fire",
        "name": "Delhi Fire Service",
        "categories": [
            "Fire Incident",
            "Gas Leak",
            "Building Collapse",
            "Emergency Rescue"
        ]
    },
    {
        "id": "dusib",
        "name": "Delhi Urban Shelter Improvement Board (DUSIB)",
        "categories": [
            "Slum",
            "JJ Colony",
            "Homeless Shelter",
            "Resettlement Colony"
        ]
    },
    {
        "id": "depwd",
        "name": "Delhi Environment Department",
        "categories": [
            "Air Pollution",
            "Noise Pollution",
            "Tree Cutting",
            "Industrial Waste",
            "Water Pollution"
        ]
    },
    {
        "id": "transport_dept",
        "name": "Delhi Transport Department",
        "categories": [
            "Driving Licence",
            "Vehicle Registration",
            "Pollution Certificate",
            "Overloading"
        ]
    },
    {
        "id": "revenue_dept",
        "name": "Delhi Revenue Department",
        "categories": [
            "Land Record",
            "Property Tax",
            "Ration Card",
            "Domicile Certificate",
            "Caste Certificate"
        ]
    },
    {
        "id": "education_dept",
        "name": "Delhi Education Department (DoE)",
        "categories": [
            "Government School",
            "Teacher Absent",
            "Mid Day Meal",
            "Scholarship",
            "Admission Issue"
        ]
    }
]

# Mapping of categories to department IDs for auto-assignment
CATEGORY_TO_DEPT = {
    # Jal Board
    "Water Supply": "jal_board",
    "Sewage": "jal_board",
    "Pipeline Leak": "jal_board",
    "Water Quality": "jal_board",
    "Borewell": "jal_board",
    
    # PWD
    "Road Repair": "pwd",
    "Pothole": "pwd",
    "Bridge": "pwd",
    "Footpath": "pwd",
    "Flyover": "pwd",
    
    # BSES Rajdhani & Yamuna
    "Power Cut": "bses_rajdhani",
    "Electric Pole": "bses_rajdhani",
    "Street Light": "bses_rajdhani",
    "Meter Issue": "bses_rajdhani",
    "Wire Hanging": "bses_rajdhani",
    
    # MCD
    "Garbage Collection": "mcd",
    "Drain Overflow": "mcd",
    "Stray Animals": "mcd",
    "Building Demolition": "mcd",
    "Sanitation": "mcd",
    "Park Maintenance": "mcd",
    
    # DDA
    "Park": "dda",
    "Playground": "dda",
    "Encroachment": "dda",
    "Housing": "dda",
    "Land Dispute": "dda",
    
    # Delhi Police
    "Security": "delhi_police",
    "Theft": "delhi_police",
    "Traffic": "delhi_police",
    "Eve Teasing": "delhi_police",
    "Noise Complaint": "delhi_police",
    "Missing Person": "delhi_police",
    
    # DIMTS
    "Bus Stop": "dimts",
    "DTC Bus Issue": "dimts",
    "Auto Rickshaw": "dimts",
    "Road Accident": "dimts",
    
    # Health
    "Government Hospital": "gnctd_health",
    "Dispensary": "gnctd_health",
    "Medicine Shortage": "gnctd_health",
    "Ambulance": "gnctd_health",
    "Mohalla Clinic": "gnctd_health",
    
    # Fire Service
    "Fire Incident": "delhi_fire",
    "Gas Leak": "delhi_fire",
    "Building Collapse": "delhi_fire",
    "Emergency Rescue": "delhi_fire",
    
    # DUSIB
    "Slum": "dusib",
    "JJ Colony": "dusib",
    "Homeless Shelter": "dusib",
    "Resettlement Colony": "dusib",
    
    # Environment
    "Air Pollution": "depwd",
    "Noise Pollution": "depwd",
    "Tree Cutting": "depwd",
    "Industrial Waste": "depwd",
    "Water Pollution": "depwd",
    
    # Transport
    "Driving Licence": "transport_dept",
    "Vehicle Registration": "transport_dept",
    "Pollution Certificate": "transport_dept",
    "Overloading": "transport_dept",
    
    # Revenue
    "Land Record": "revenue_dept",
    "Property Tax": "revenue_dept",
    "Ration Card": "revenue_dept",
    "Domicile Certificate": "revenue_dept",
    "Caste Certificate": "revenue_dept",
    
    # Education
    "Government School": "education_dept",
    "Teacher Absent": "education_dept",
    "Mid Day Meal": "education_dept",
    "Scholarship": "education_dept",
    "Admission Issue": "education_dept"
}


def get_department_by_id(dept_id: str):
    """Get department details by ID"""
    for dept in DELHI_DEPARTMENTS:
        if dept["id"] == dept_id:
            return dept
    return None


def get_categories_for_department(dept_id: str):
    """Get all categories for a specific department"""
    dept = get_department_by_id(dept_id)
    return dept["categories"] if dept else []


def get_department_for_category(category: str):
    """Get department ID for a given category"""
    return CATEGORY_TO_DEPT.get(category, None)
