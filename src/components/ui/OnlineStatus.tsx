'use client';

import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Button } from './Button';
import { Card } from './Card';
import { Typography } from './Typography';
import { Wifi, WifiOff, Download, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function OnlineStatus() {
  const { isOnline, updateAvailable, updateApp, dismissUpdate } = useServiceWorker();

  return (
    <>
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="p-3 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
              <div className="flex items-center gap-2">
                <WifiOff size={16} className="text-yellow-600 dark:text-yellow-400" />
                <Typography variant="small" className="text-yellow-800 dark:text-yellow-200">
                  You&apos;re offline. Some features may not work.
                </Typography>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOnline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 left-4 z-40"
          >
            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
              <Wifi size={16} className="text-green-600 dark:text-green-400" />
              <Typography variant="small" className="text-green-800 dark:text-green-200 pr-2">
                Online
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {updateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700 max-w-sm">
              <div className="flex items-start gap-3">
                <Download size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <Typography variant="body" className="text-blue-800 dark:text-blue-200 mb-2">
                    New version available!
                  </Typography>
                  <Typography variant="small" className="text-blue-600 dark:text-blue-300 mb-3">
                    Update now to get the latest features and improvements.
                  </Typography>
                  <div className="flex gap-2">
                    <Button
                      onClick={updateApp}
                      variant="primary"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={dismissUpdate}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Later
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={dismissUpdate}
                  variant="ghost"
                  size="sm"
                  className="p-1 text-blue-600 hover:text-blue-700"
                >
                  <X size={16} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}