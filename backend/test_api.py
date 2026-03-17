"""
Comprehensive API Testing Script for Smart P-CRM Backend

This script demonstrates how to interact with all API endpoints.
Can be run as a standalone test suite.

Usage:
    python test_api.py
"""

import requests
import json
from datetime import datetime, timedelta
from typing import Dict, Optional

# Configuration
BASE_URL = "http://localhost:8000"
HEADERS = {"Content-Type": "application/json"}

# Test data storage
tokens = {}
user_ids = {}
complaint_ids = {}


class Colors:
    """ANSI color codes for terminal output"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'


def print_section(title: str):
    """Print formatted section header"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}{Colors.END}\n")


def print_success(msg: str):
    """Print success message"""
    print(f"{Colors.GREEN}✓ {msg}{Colors.END}")


def print_error(msg: str):
    """Print error message"""
    print(f"{Colors.RED}✗ {msg}{Colors.END}")


def print_info(msg: str):
    """Print info message"""
    print(f"{Colors.CYAN}ℹ {msg}{Colors.END}")


def print_json(data: dict, indent: int = 2):
    """Pretty print JSON data"""
    print(json.dumps(data, indent=indent, default=str))


def health_check():
    """Test API health"""
    print_section("Health Check")
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print_success("API is healthy")
            print_info(f"Response: {response.json()}")
            return True
    except Exception as e:
        print_error(f"API is not responding: {str(e)}")
        return False
    
    return False


def auth_register():
    """Test user registration"""
    print_section("Authentication: Register")
    
    test_users = [
        {
            "name": "Test Citizen",
            "email": "test.citizen@example.com",
            "phone": "9999999990",
            "password": "testpass123",
            "role": "citizen"
        }
    ]
    
    for user in test_users:
        try:
            response = requests.post(
                f"{BASE_URL}/auth/register",
                json=user,
                headers=HEADERS
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Registered: {user['name']}")
                print_info(f"Email: {user['email']}")
                print_info(f"Role: {user['role']}")
                
                # Store token and ID
                tokens["citizen"] = data["access_token"]
                user_ids["citizen"] = data["id"]
                
                print_info(f"Token stored for citizen: {data['access_token'][:20]}...")
                print_info(f"User ID: {data['id']}")
                
            else:
                print_error(f"Registration failed: {response.status_code}")
                print_json(response.json())
        
        except Exception as e:
            print_error(f"Registration error: {str(e)}")


def auth_login():
    """Test user login"""
    print_section("Authentication: Login")
    
    test_accounts = [
        {"email": "citizen@example.com", "password": "citizen123", "role": "citizen"},
        {"email": "admin@example.com", "password": "admin123", "role": "admin"},
        {"email": "worker@example.com", "password": "worker123", "role": "worker"},
        {"email": "superadmin@example.com", "password": "superadmin123", "role": "superadmin"}
    ]
    
    for account in test_accounts:
        try:
            response = requests.post(
                f"{BASE_URL}/auth/login",
                json={"email": account["email"], "password": account["password"]},
                headers=HEADERS
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Logged in: {data['name']} ({account['role']})")
                print_info(f"Email: {account['email']}")
                
                # Store token and ID
                tokens[account["role"]] = data["access_token"]
                user_ids[account["role"]] = data["id"]
                
                print_info(f"Token: {data['access_token'][:30]}...")
            else:
                print_error(f"Login failed: {response.status_code}")
                if response.text:
                    print_json(response.json())
        
        except Exception as e:
            print_error(f"Login error: {str(e)}")


def submit_complaint():
    """Test complaint submission"""
    print_section("Complaints: Submit")
    
    if "citizen" not in tokens:
        print_error("Citizen not logged in. Run login first.")
        return
    
    complaints = [
        {
            "text": "Large pothole on Main Street causing traffic hazard",
            "category": "pothole",
            "urgency": "high"
        },
        {
            "text": "Street light near park not working for 2 weeks",
            "category": "streetlight",
            "urgency": "medium"
        }
    ]
    
    headers = {**HEADERS, "Authorization": f"Bearer {tokens['citizen']}"}
    
    for complaint in complaints:
        try:
            response = requests.post(
                f"{BASE_URL}/complaints/submit",
                json=complaint,
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Submitted: {complaint['text'][:50]}...")
                print_info(f"Complaint ID: {data['id']}")
                print_info(f"Category: {data['category']}")
                print_info(f"Urgency: {data['urgency']}")
                if data.get("sentiment"):
                    print_info(f"Sentiment: {data['sentiment']}")
                
                # Store complaint ID
                complaint_ids["citizen"] = data["id"]
            
            else:
                print_error(f"Submission failed: {response.status_code}")
                print_json(response.json())
        
        except Exception as e:
            print_error(f"Submission error: {str(e)}")


def get_complaints():
    """Test getting complaints by role"""
    print_section("Complaints: Get by Role")
    
    roles = ["citizen", "admin", "worker", "superadmin"]
    
    for role in roles:
        if role not in tokens:
            print_info(f"Skipping {role} - not logged in")
            continue
        
        try:
            headers = {**HEADERS, "Authorization": f"Bearer {tokens[role]}"}
            response = requests.get(
                f"{BASE_URL}/complaints",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"{role.upper()}: Retrieved {data['count']} complaints")
                
                for complaint in data["complaints"][:2]:  # Show first 2
                    print_info(f"  - {complaint['text'][:50]}... (Status: {complaint['status']})")
            
            else:
                print_error(f"{role} - Get failed: {response.status_code}")
        
        except Exception as e:
            print_error(f"{role} - Error: {str(e)}")


def get_specific_complaint():
    """Test getting specific complaint"""
    print_section("Complaints: Get Specific")
    
    if "citizen" not in tokens or "citizen" not in complaint_ids:
        print_error("No complaint to retrieve. Submit complaint first.")
        return
    
    try:
        headers = {**HEADERS, "Authorization": f"Bearer {tokens['citizen']}"}
        response = requests.get(
            f"{BASE_URL}/complaints/{complaint_ids['citizen']}",
            headers=headers
        )
        
        if response.status_code == 200:
            data = response.json()
            print_success(f"Retrieved complaint: {data['_id']}")
            print_info(f"Text: {data['text']}")
            print_info(f"Category: {data['category']}")
            print_info(f"Status: {data['status']}")
            print_info(f"Created: {data['created_at']}")
        else:
            print_error(f"Get failed: {response.status_code}")
    
    except Exception as e:
        print_error(f"Error: {str(e)}")


def assign_complaint():
    """Test assigning complaint to worker"""
    print_section("Complaints: Assign to Worker")
    
    if "admin" not in tokens or "citizen" not in complaint_ids:
        print_error("Missing admin token or complaint ID")
        return
    
    if "worker" not in user_ids:
        print_error("Worker not available")
        return
    
    try:
        deadline = datetime.utcnow() + timedelta(days=7)
        
        headers = {**HEADERS, "Authorization": f"Bearer {tokens['admin']}"}
        response = requests.put(
            f"{BASE_URL}/complaints/{complaint_ids['citizen']}/assign",
            json={
                "worker_id": user_ids["worker"],
                "deadline": deadline.isoformat()
            },
            headers=headers
        )
        
        if response.status_code == 200:
            print_success("Complaint assigned to worker")
            print_info(f"Worker ID: {user_ids['worker']}")
            print_info(f"Deadline: {deadline}")
        else:
            print_error(f"Assignment failed: {response.status_code}")
            print_json(response.json())
    
    except Exception as e:
        print_error(f"Error: {str(e)}")


def complete_complaint():
    """Test completing complaint"""
    print_section("Complaints: Complete")
    
    if "worker" not in tokens or "citizen" not in complaint_ids:
        print_error("Missing worker token or complaint ID")
        return
    
    try:
        headers = {**HEADERS, "Authorization": f"Bearer {tokens['worker']}"}
        response = requests.put(
            f"{BASE_URL}/complaints/{complaint_ids['citizen']}/complete",
            json={
                "work_notes": "Pothole repaired and sealed successfully",
                "after_photo": "/uploads/after/sample_photo.jpg"
            },
            headers=headers
        )
        
        if response.status_code == 200:
            print_success("Complaint marked as completed")
            print_info("Work notes: Pothole repaired and sealed successfully")
        else:
            print_error(f"Completion failed: {response.status_code}")
            print_json(response.json())
    
    except Exception as e:
        print_error(f"Error: {str(e)}")


def approve_complaint():
    """Test approving complaint"""
    print_section("Complaints: Approve")
    
    if "superadmin" not in tokens or "citizen" not in complaint_ids:
        print_error("Missing superadmin token or complaint ID")
        return
    
    try:
        headers = {**HEADERS, "Authorization": f"Bearer {tokens['superadmin']}"}
        response = requests.put(
            f"{BASE_URL}/complaints/{complaint_ids['citizen']}/approve",
            json={"notes": "Work completed to standard"},
            headers=headers
        )
        
        if response.status_code == 200:
            print_success("Complaint approved")
            print_info("Approval notes: Work completed to standard")
        else:
            print_error(f"Approval failed: {response.status_code}")
            print_json(response.json())
    
    except Exception as e:
        print_error(f"Error: {str(e)}")


def test_unauthorized_access():
    """Test unauthorized access"""
    print_section("Security: Unauthorized Access")
    
    try:
        # Try without token
        response = requests.get(f"{BASE_URL}/complaints")
        
        if response.status_code == 403:
            print_success("Correctly rejected request without token")
        else:
            print_error(f"Expected 403, got {response.status_code}")
    
    except Exception as e:
        print_error(f"Error: {str(e)}")
    
    try:
        # Try with invalid token
        headers = {**HEADERS, "Authorization": "Bearer invalid_token_xyz"}
        response = requests.get(f"{BASE_URL}/complaints", headers=headers)
        
        if response.status_code == 401:
            print_success("Correctly rejected invalid token")
        else:
            print_error(f"Expected 401, got {response.status_code}")
    
    except Exception as e:
        print_error(f"Error: {str(e)}")


def run_all_tests():
    """Run all tests in sequence"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔" + "="*68 + "╗")
    print("║" + " "*15 + "Smart P-CRM Backend API Test Suite" + " "*19 + "║")
    print("╚" + "="*68 + "╝")
    print(f"{Colors.END}\n")
    
    # Run tests
    if not health_check():
        print_error("API is not running. Start the server with: python main.py")
        return
    
    auth_login()
    auth_register()
    submit_complaint()
    get_complaints()
    get_specific_complaint()
    assign_complaint()
    complete_complaint()
    approve_complaint()
    test_unauthorized_access()
    
    # Final summary
    print_section("Test Summary")
    print_success(f"Total roles tested: {len(tokens)}")
    print_success(f"Total complaints created: {len(complaint_ids)}")
    print_info(f"Tokens acquired: {list(tokens.keys())}")
    
    print(f"\n{Colors.BOLD}{Colors.GREEN}All tests completed!{Colors.END}\n")


if __name__ == "__main__":
    try:
        run_all_tests()
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Tests interrupted by user{Colors.END}\n")
    except Exception as e:
        print_error(f"Unexpected error: {str(e)}")
