import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';


@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    private readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

    private readonly validImageTypes = [
        'image/png', 'image/jpeg', 'image/jpg', 'image/gif',
        'image/bmp', 'image/webp', 'image/avif', 'image/svg+xml',
        'image/tiff', 'image/x-icon', 'image/heif', 'image/heic'
    ];

    private readonly validDocTypes = [
        ...this.validImageTypes,  // Allow images inside docs validation
        'application/pdf',        // PDF files
        'application/msword',      // DOC (Word 97-2003)
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX (Word)
        'text/plain'               // TXT files
    ];

    constructor(private notificationService: NotificationService) { }

    /**
     * Validates an image file.
     * @param file File object to validate
     * @returns true if valid, false otherwise
     */
    validateImage(file: File): boolean {
        return this.validateFile(file, this.validImageTypes, 'image');
    }

    /**
     * Validates a document file (includes images, PDFs, Word, and text files).
     * @param file File object to validate
     * @returns true if valid, false otherwise
     */
    validateDocument(file: File): boolean {
        return this.validateFile(file, this.validDocTypes, 'document');
    }

    /**
     * Common validation function for files.
     * @param file File to validate
     * @param allowedTypes Array of allowed MIME types
     * @param fileType 'image' or 'document' for error messages
     * @returns true if valid, false otherwise
     */
    private validateFile(file: File, allowedTypes: string[], fileType: string): boolean {
        if (!allowedTypes.includes(file.type)) {
            this.notificationService.showError(`Invalid ${fileType} format. Allowed formats: ${allowedTypes.join(', ')}`);
            return false;
        }

        if (file.size > this.MAX_FILE_SIZE) {
            this.notificationService.showError(`File size must be less than 2 MB.`);
            return false;
        }

        return true;
    }
}
