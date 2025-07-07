'use client';

import { useState } from 'react';
import { ProjectImage } from '@/types';
import { MotionDiv, slideUpVariants } from '@/components/ui/MotionComponents';
import { Text } from '@/components/ui/Typography';

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const heroImage = images.find(img => img.type === 'hero');
  const galleryImages = images.filter(img => img.type === 'gallery').sort((a, b) => a.order - b.order);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    const allImages = [heroImage, ...galleryImages].filter(Boolean);
    setSelectedImage((selectedImage + 1) % allImages.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    const allImages = [heroImage, ...galleryImages].filter(Boolean);
    setSelectedImage(selectedImage === 0 ? allImages.length - 1 : selectedImage - 1);
  };

  const allImages = [heroImage, ...galleryImages].filter(Boolean) as ProjectImage[];

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      {heroImage && (
        <MotionDiv 
          variants={slideUpVariants}
          className="relative group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <div className="aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
            <div className="w-full h-full bg-gradient-to-br from-primary-100/50 to-accent-100/50 dark:from-primary-900/50 dark:to-accent-900/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl group-hover:rotate-3 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <Text className="text-lg font-medium text-secondary-700 dark:text-secondary-300">
                  {heroImage.alt}
                </Text>
                {heroImage.caption && (
                  <Text className="text-sm text-secondary-500 dark:text-secondary-400 mt-2">
                    {heroImage.caption}
                  </Text>
                )}
              </div>
            </div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </MotionDiv>
      )}

      {/* Gallery Grid */}
      {galleryImages.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <MotionDiv
              key={image.id}
              variants={slideUpVariants}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(heroImage ? index + 1 : index)}
            >
              <div className="aspect-video bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <div className="w-full h-full bg-gradient-to-br from-secondary-200/50 to-secondary-300/50 dark:from-secondary-700/50 dark:to-secondary-600/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 dark:from-secondary-600 dark:to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <Text className="text-sm font-medium text-secondary-700 dark:text-secondary-300 text-center">
                      {image.alt}
                    </Text>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white dark:bg-secondary-900 rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <Text className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    {allImages[selectedImage].alt}
                  </Text>
                  {allImages[selectedImage].caption && (
                    <Text className="text-secondary-600 dark:text-secondary-400">
                      {allImages[selectedImage].caption}
                    </Text>
                  )}
                </div>
              </div>
            </div>
            
            {allImages.length > 1 && (
              <div className="flex justify-center mt-4">
                <div className="bg-black/50 rounded-full px-3 py-1">
                  <Text className="text-white text-sm">
                    {selectedImage + 1} of {allImages.length}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}