import React, { useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';

import { QrCode, Download, Copy, RefreshCw, Link as LinkIcon } from 'lucide-react';


import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



export  function Login() {
  return (
    <>
    <QrCodeGenerator/>
    <QrCodeGenerator2/>
    <PdfDocument/>
    </>
  )
}







function QrCodeGenerator() {
  const [text, setText] = useState('');

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = url;
      link.click();
    }
  };

  const copyQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <QrCode className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">QR Code Generator</h1>
          </div>

          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your information
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Enter your information (name, contact, etc.)"
              />
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
              {text ? (
                <div className="bg-white p-4 rounded-lg shadow">
                  <QRCodeCanvas
                    value={text}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <RefreshCw className="w-16 h-16 mb-2" />
                  <p>Enter your information to generate QR code</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {text && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={copyQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}





function QrCodeGenerator2() {
  const [pageUrl, setPageUrl] = useState('');
  const [title, setTitle] = useState('');

  const generateQRLink = () => {
    // Create a URL with title as a query parameter
    return `${pageUrl}${pageUrl.includes('?') ? '&' : '?'}title=${encodeURIComponent(title)}`;
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qrcode-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = url;
      link.click();
    }
  };

  const copyQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]);
        }
      });
    }
  };

  const previewLink = () => {
    if (pageUrl) {
      window.open(generateQRLink(), '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <QrCode className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Page Link QR Generator</h1>
          </div>

          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/page"
                  />
                  <button
                    onClick={previewLink}
                    disabled={!pageUrl}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the page title"
                />
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
              {pageUrl && title ? (
                <div className="bg-white p-4 rounded-lg shadow">
                  <QRCodeCanvas
                    value={generateQRLink()}
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Scan to visit: {title}
                  </p>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <RefreshCw className="w-16 h-16 mb-2" />
                  <p>Enter page URL and title to generate QR code</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {pageUrl && title && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={downloadQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={copyQRCode}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



// Sample users data - replace with your actual data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign:'left',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
  },
});

// PDF Document component
const UsersPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Users List</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Email</Text>
          <Text style={styles.tableCell}>Role</Text>
        </View>
        {users.map((user) => (
          <View key={user.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{user.name}</Text>
            <Text style={styles.tableCell}>{user.email}</Text>
            <Text style={styles.tableCell}>{user.role}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

function PdfDocument() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Users List</h1>
            <PDFDownloadLink
              document={<UsersPDF />}
              fileName="users-list.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {({ loading }) => (
                <>
                  <Download className="w-4 h-4" />
                  {loading ? 'Generating PDF...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

