import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { css } from '../../../styled-system/css';

export const FinalMessage = ({ death }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messageLines, setMessageLines] = useState([]);

  useEffect(() => {
    if (death && death.isDead) {
      const messages = generateMessages(death.reason);
      setMessageLines(messages);

      const timer = setTimeout(() => setIsVisible(true), 500);

      return () => clearTimeout(timer);
    }
  }, [death]);

  const generateMessages = (reason) => {
    switch (reason) {
      case 'hungry':
        return [
          'TAMAGOTCHI STARVED',
          'Your Tamagotchi was very hungry and asking for food since 2 hours.',
          "It's dead now.",
          'Congratulations.',
        ];
      case 'happy':
        return [
          'TAMAGOTCHI SAD',
          'Your Tamagotchi died of boredom.',
          'It would have liked to play with you a little more.',
          'Congratulations.',
        ];
      case 'overfed':
        return [
          'TAMAGOTCHI EXPLODED',
          'Your Tamagotchi exploded from eating too much.',
          'You should have rationed it a little...',
          'Congratulations.',
        ];
      case 'sick':
        return [
          'TAMAGOTCHI SICK',
          "Your Tamagotchi's arteries are clogged with cheeseburgers and fries.",
          'It seems a balanced diet was important after all.',
          'Congratulations.',
        ];
      default:
        return ['TAMAGOTCHI DEAD', 'You failed to keep your pet alive.', 'Congratulations.'];
    }
  };

  const handleRestart = () => {
    setIsVisible(false);
    window.location.reload();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={css({
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 228, 196, 0.8)',
            fontFamily: 'monospace',
            zIndex: 1000,
          })}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={css({
              backgroundColor: 'rgba(240, 248, 255, 0.95)',
              border: '4px solid #FFA07A',
              borderRadius: '1rem',
              p: '8',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            })}
          >
            <motion.div variants={container} initial="hidden" animate="show">
              {messageLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className={css({
                    color: index === 0 ? '#FF69B4' : '#808080',
                    fontSize: index === 0 ? '2rem' : '1.2rem',
                    fontWeight: index === 0 ? 'bold' : 'normal',
                    mb: '4',
                    textShadow: index === 0 ? '2px 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                  })}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: messageLines.length * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className={css({
                mt: '8',
                px: '8',
                py: '4',
                bg: '#FFB6C1',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              })}
            >
              RETRY
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
