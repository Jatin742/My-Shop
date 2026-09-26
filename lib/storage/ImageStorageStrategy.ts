export interface ImageStorageStrategy {
    upload(file: File): Promise<string>;
}