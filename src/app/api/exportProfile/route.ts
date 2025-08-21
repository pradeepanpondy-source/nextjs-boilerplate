import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  preferences: string[];
  memberSince: string;
  totalOrders: number;
  favoriteProducts: string[];
}

export async function POST(request: NextRequest) {
  try {
    const profileData: UserProfile = await request.json();

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Prepare profile data for Excel
    const profileSheet = [
      ['Field', 'Value'],
      ['First Name', profileData.firstName],
      ['Last Name', profileData.lastName],
      ['Email', profileData.email],
      ['Phone', profileData.phone],
      ['Address', profileData.address],
      ['City', profileData.city],
      ['State', profileData.state],
      ['Zip Code', profileData.zipCode],
      ['Member Since', profileData.memberSince],
      ['Total Orders', profileData.totalOrders.toString()],
    ];

    // Create the main profile worksheet
    const profileWorksheet = XLSX.utils.aoa_to_sheet(profileSheet);

    // Set column widths for better readability
    profileWorksheet['!cols'] = [
      { width: 20 }, // Field column
      { width: 30 }  // Value column
    ];

    // Add the profile worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, profileWorksheet, 'Profile');

    // Create preferences worksheet if there are preferences
    if (profileData.preferences && profileData.preferences.length > 0) {
      const preferencesSheet = [
        ['Shopping Preferences'],
        ...profileData.preferences.map(pref => [pref])
      ];
      const preferencesWorksheet = XLSX.utils.aoa_to_sheet(preferencesSheet);
      preferencesWorksheet['!cols'] = [{ width: 30 }];
      XLSX.utils.book_append_sheet(workbook, preferencesWorksheet, 'Preferences');
    }

    // Create favorite products worksheet if there are favorite products
    if (profileData.favoriteProducts && profileData.favoriteProducts.length > 0) {
      const favoritesSheet = [
        ['Favorite Products'],
        ...profileData.favoriteProducts.map(product => [product])
      ];
      const favoritesWorksheet = XLSX.utils.aoa_to_sheet(favoritesSheet);
      favoritesWorksheet['!cols'] = [{ width: 30 }];
      XLSX.utils.book_append_sheet(workbook, favoritesWorksheet, 'Favorites');
    }

    // Create summary worksheet
    const summarySheet = [
      ['Account Summary'],
      [''],
      ['Full Name', `${profileData.firstName} ${profileData.lastName}`],
      ['Contact Email', profileData.email],
      ['Phone Number', profileData.phone],
      ['Full Address', `${profileData.address}, ${profileData.city}, ${profileData.state} ${profileData.zipCode}`],
      ['Member Since', profileData.memberSince],
      ['Total Orders Placed', profileData.totalOrders.toString()],
      ['Number of Preferences', profileData.preferences?.length.toString() || '0'],
      ['Number of Favorite Products', profileData.favoriteProducts?.length.toString() || '0'],
      [''],
      ['Export Date', new Date().toLocaleDateString()],
      ['Export Time', new Date().toLocaleTimeString()],
    ];

    const summaryWorksheet = XLSX.utils.aoa_to_sheet(summarySheet);
    summaryWorksheet['!cols'] = [
      { width: 25 }, // Label column
      { width: 35 }  // Value column
    ];

    // Add the summary worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `profile_${profileData.firstName}_${profileData.lastName}_${timestamp}.xlsx`;

    // Return the Excel file as response
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Excel export error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to export profile data',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Profile export endpoint is working. Use POST method with profile data to export.',
      usage: 'POST /api/exportProfile with JSON body containing profile data'
    },
    { status: 200 }
  );
}
