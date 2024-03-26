/**
 * This library has no type declarations available, so no circumnavigate the annoying TS error
 * I'm declaring it as type any.
 */

declare module 'use-react-screenshot' {
    import { Options } from 'html2canvas';
  
    type HookReturn = [string | null, (node: HTMLElement | null, options?: Options) => Promise<string>, { error: string | null }];
  
    export function useScreenshot(options?: { type?: string; quality?: number }): HookReturn;
  
    /**
     * Creates the name of the file.
     * @param extension - The file extension.
     * @param names - Parts of the file name.
     * @returns The generated file name.
     */
    export function createFileName(extension: string, ...names: string[]): string;
  }
  