import * as fs from 'fs';
import * as path from 'path';

// Function to clear the playwright-report directory
export function clearReport() {
    const reportDir = path.join(__dirname, '../playwright-report');
    if (fs.existsSync(reportDir)) {
        fs.rmSync(reportDir, { recursive: true, force: true });
        console.log(`Cleared directory: ${reportDir}`);
    } else {
        console.log(`Directory does not exist: ${reportDir}`);  
    }
}