// src/data/mockBlueprint.js

export const mockBlueprint = {
    id: "bp_aalto_et_01",
    title: "Student Success Guide: From Application to Arrival",
    institution: "Aalto University",
    targetAudience: "Non-EU Exchange Students (East Africa / Ethiopia focus)",
    rootSteps: [
      // --- PHASE 1 ---
      {
        id: "ph_1",
        title: "Phase 1: Application & Course Selection",
        status: "In_Progress",
        hasFeedback: true,
        userRating: 1,
        userFeedback: "This is a test feedback",
        details: "Goal: Submit a compliant study plan and pass the interviews.",
        PersonalComment: "This is a test personal comment",
        children: [
          {
            id: "p1_1",
            title: "1.1 Navigating Course Selection",
            status: "In_Progress",
            details: "Aalto’s course list is extensive. Do not try to read every row.",
            children: [
              {
                id: "p1_1_a",
                title: "Action: Use Search, Don't Scroll",
                status: "Completed",
                details: "Use Ctrl+F to find keywords related to your major.",
                children: []
              },
              {
                id: "p1_1_b",
                title: "Action: Check Teaching Periods",
                status: "In_Progress",
                details: "Balance workload between Autumn 1 (Sept-Oct) and Autumn 2 (Oct-Dec). Don't book 30 credits in one period.",
                children: []
              },
              {
                id: "p1_1_c",
                title: "The 2/3 Rule (ELEC Students)",
                status: "Comment",
                details: "If you are in the School of Electrical Engineering, ensure >50% of courses are within ELEC.",
                children: []
              }
            ]
          },
          {
            id: "p1_2",
            title: "1.2 The Interviews",
            status: "To_Do",
            details: "Prepare for two rounds: Home University (Motivation) and Aalto (Adaptability).",
            children: [
               {
                id: "p1_2_a",
                title: "Check Internet Connection",
                status: "To_Do",
                details: "Ensure stability before the call starts.",
                children: []
              }
            ]
          }
        ]
      },
  
      // --- PHASE 2 ---
      {
        id: "ph_2",
        title: "Phase 2: Immediate Actions Post-Selection",
        status: "To_Do",
        details: "Goal: Secure a roof over your head. Time is your enemy here.",
        children: [
          {
            id: "p2_1",
            title: "2.1 The 'Housing First' Strategy",
            status: "To_Do",
            details: "CRITICAL: Do not wait for your official Admission Letter. The market is extremely competitive.",
            children: [
              {
                id: "p2_1_a",
                title: "Action: Apply Immediately",
                status: "To_Do",
                details: "Apply to HOAS and AYY as soon as you get the selection email.",
                children: []
              },
              {
                id: "p2_1_b",
                title: "Strategy: Apply for Unfurnished Rooms",
                status: "To_Do",
                details: "Furnished rooms run out instantly. Unfurnished is easier to get. It is cheaper to buy a mattress than to have no home.",
                children: []
              },
              {
                id: "p2_1_c",
                title: "Action: Check Commute Time",
                status: "To_Do",
                details: "Use the HSL app. Target max 40 mins to Otaniemi.",
                children: []
              }
            ]
          }
        ]
      },
  
      // --- PHASE 3 ---
      {
        id: "ph_3",
        title: "Phase 3: Immigration & Pre-Departure",
        status: "To_Do",
        details: "Goal: Get your Residence Permit and Student Identity.",
        children: [
          {
            id: "p3_1",
            title: "3.1 Residence Permit (Migri)",
            status: "To_Do",
            details: "Apply for a Residence Permit for Studies at Enterfinland.fi.",
            children: [
              {
                id: "p3_1_a",
                title: "Action: Book Identification Appointment",
                status: "To_Do",
                details: "Select Embassy or VFS Office in the application.",
                children: []
              },
              {
                id: "p3_1_b",
                title: "🇪🇹 Ethiopia Specific: Naming & Addresses",
                status: "To_Do",
                details: "First Name = Your Name + Father's Name. Last Name = Grandfather's Name. Use campus address if you have no Zip code.",
                children: []
              }
            ]
          },
          {
            id: "p3_2",
            title: "3.2 Aalto Digital Identity (IT Activation)",
            status: "To_Do",
            details: "Aalto will ask you to activate your student account.",
            children: [
              {
                id: "p3_2_a",
                title: "🇪🇹 Workaround: The SMS Issue",
                status: "To_Do",
                details: "Ethiopian numbers cannot receive the Aalto SMS. Do not wait for it.",
                children: [
                  {
                     id: "p3_2_a_1",
                     title: "Action: Email IT Service Desk",
                     status: "To_Do",
                     details: "Subject: 'Account Activation - SMS Issue (Ethiopia)'. Ask for password via Signal.",
                     children: []
                  }
                ]
              }
            ]
          },
          {
            id: "p3_3",
            title: "3.3 Financial & Payment Preparation",
            status: "To_Do",
            details: "Managing international payments for Insurance and VFS.",
            children: [
               {
                id: "p3_3_a",
                title: "🇪🇹 Workaround: Payment Hurdles",
                status: "To_Do",
                details: "Cannot use Ethiopian accounts for online payments.",
                children: [
                  {
                     id: "p3_3_a_1",
                     title: "Option A: Friend/Relative in Europe",
                     status: "To_Do",
                     details: "Ask them to pay on your behalf.",
                     children: []
                  },
                  {
                     id: "p3_3_a_2",
                     title: "Option B: P2P Crypto to Virtual Card",
                     status: "To_Do",
                     details: "Use Binance P2P -> Bybit/Payoneer Virtual Mastercard.",
                     children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      
      // --- PHASE 4 ---
      {
          id: "ph_4",
          title: "Phase 4: The Journey (Travel & Arrival)",
          status: "To_Do",
          details: "Goal: Arrive safely and pass the final border check.",
          children: [
              {
                  id: "p4_3",
                  title: "4.3 Arrival & Immigration (Moment of Truth)",
                  status: "To_Do",
                  details: "Finnish Border Guards are strict. Have proof of funds ready.",
                  children: [
                      {
                          id: "p4_3_a",
                          title: "🇪🇹 Ethiopia Specific: Banking Proof",
                          status: "To_Do",
                          details: "CBE cards do not show balance at foreign ATMs. You MUST bring a printed, stamped paper statement.",
                          children: []
                      }
                  ]
              }
          ]
      }
    ]
  };