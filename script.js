// Animation du premier jour d'école
class SchoolDayAnimation {
    constructor() {
        this.currentStep = 0;
        this.scenes = [
            '.opening-scene',
            '.step-scene[data-step="1"]',
            '.step-scene[data-step="2"]',
            '.step-scene[data-step="3"]',
            '.step-scene[data-step="4"]',
            '.step-scene[data-step="5"]',
            '.closing-scene'
        ];
        this.timing = [
            4000, // Scène d'ouverture
            3000, // Étape 1
            3000, // Étape 2
            3000, // Étape 3
            3000, // Étape 4
            3000, // Étape 5
            4000  // Clôture
        ];

        this.init();
    }

    init() {
        // Commencer l'animation après un court délai
        setTimeout(() => {
            this.showScene(0);
        }, 500);
    }

    showScene(sceneIndex) {
        // Masquer la scène précédente
        if (sceneIndex > 0) {
            const prevScene = document.querySelector(this.scenes[sceneIndex - 1]);
            if (prevScene) {
                prevScene.style.opacity = '0';
                prevScene.style.zIndex = '1';
            }
        }

        // Afficher la scène actuelle
        const currentScene = document.querySelector(this.scenes[sceneIndex]);
        if (currentScene) {
            currentScene.style.opacity = '1';
            currentScene.style.zIndex = '10';

            // Animer les éléments spécifiques de chaque scène
            this.animateSceneElements(currentScene, sceneIndex);

            // Programmer la scène suivante
            if (sceneIndex < this.scenes.length - 1) {
                setTimeout(() => {
                    this.showScene(sceneIndex + 1);
                }, this.timing[sceneIndex]);
            }
        }
    }

    animateSceneElements(scene, sceneIndex) {
        switch(sceneIndex) {
            case 0:
                // Scène d'ouverture - déjà gérée par CSS
                this.showBackgroundElements(scene);
                break;
            case 1:
                // Étape 1 : Le départ
                this.animateStep1(scene);
                break;
            case 2:
                // Étape 2 : L'arrivée
                this.animateStep2(scene);
                break;
            case 3:
                // Étape 3 : L'assemblée
                this.animateStep3(scene);
                break;
            case 4:
                // Étape 4 : Le couloir
                this.animateStep4(scene);
                break;
            case 5:
                // Étape 5 : L'aide
                this.animateStep5(scene);
                break;
            case 6:
                // Clôture
                this.animateClosing(scene);
                break;
        }
    }

    showBackgroundElements(scene) {
        // Afficher les éléments de fond avec un délai
        setTimeout(() => {
            const backgroundElements = scene.querySelectorAll('.background-element');
            backgroundElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 1000);
    }

    animateStep1(scene) {
        // Animer le texte de l'étape 1
        const textElement = scene.querySelector('.step-text');
        if (textElement) {
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';
            }, 500);
        }

        // Animer l'icône avec un pulse plus fort
        const icon = scene.querySelector('.sun-icon');
        if (icon) {
            icon.style.animation = 'sunRotate 4s linear infinite, iconPulse 1s ease-in-out infinite';
        }
    }

    animateStep2(scene) {
        const textElement = scene.querySelector('.step-text');
        if (textElement) {
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';
            }, 500);
        }

        // Animer l'icône de marche
        const icon = scene.querySelector('.walk-icon');
        if (icon) {
            icon.style.animation = 'walkBounce 2s ease-in-out infinite';
        }

        // Afficher les silhouettes
        this.showBackgroundElements(scene);
    }

    animateStep3(scene) {
        const textElement = scene.querySelector('.step-text');
        if (textElement) {
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';

                // Animer le mot "collective"
                const highlight = textElement.querySelector('.highlight');
                if (highlight) {
                    setTimeout(() => {
                        highlight.style.color = '#f39c12';
                        highlight.style.transform = 'scale(1.1)';
                    }, 1000);
                }
            }, 500);
        }

        // Animer l'icône de groupe
        const icon = scene.querySelector('.group-icon');
        if (icon) {
            icon.style.animation = 'groupPulse 2s ease-in-out infinite';
        }

        // Afficher les bulles de dialogue
        this.showBackgroundElements(scene);
    }

    animateStep4(scene) {
        const textElement = scene.querySelector('.step-text');
        if (textElement) {
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';
            }, 500);
        }

        // Animer l'icône de porte
        const icon = scene.querySelector('.door-icon');
        if (icon) {
            icon.style.animation = 'doorSwing 3s ease-in-out infinite';
        }

        // Afficher les dessins
        this.showBackgroundElements(scene);
    }

    animateStep5(scene) {
        const textElement = scene.querySelector('.step-text');
        if (textElement) {
            setTimeout(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';

                // Animer le texte "jamais seul"
                const highlight = textElement.querySelector('.highlight-bold');
                if (highlight) {
                    setTimeout(() => {
                        highlight.style.color = '#e67e22';
                        highlight.style.transform = 'scale(1.1)';
                        highlight.style.fontWeight = 'bold';
                    }, 1000);
                }
            }, 500);
        }

        // Animer l'icône des mains
        const icon = scene.querySelector('.hands-icon');
        if (icon) {
            icon.style.animation = 'handsShake 2s ease-in-out infinite';
        }

        // Afficher la petite figurine
        this.showBackgroundElements(scene);
    }

    animateClosing(scene) {
        // Afficher les textes de clôture
        const closingTexts = scene.querySelectorAll('.closing-text');
        closingTexts.forEach((text, index) => {
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }, index * 500);
        });

        // Afficher les icônes finales
        setTimeout(() => {
            const finalIcons = scene.querySelector('.final-icons');
            if (finalIcons) {
                finalIcons.style.opacity = '1';
                finalIcons.style.transform = 'translateX(-50%) translateY(0)';
            }
        }, 1000);

        // Afficher l'enfant joyeux
        setTimeout(() => {
            const happyChild = scene.querySelector('.happy-child');
            if (happyChild) {
                happyChild.style.opacity = '1';
                happyChild.style.transform = 'translateX(-50%) translateY(0) scale(1.2)';
            }
        }, 1500);

        // Animation finale
        setTimeout(() => {
            scene.style.background = 'linear-gradient(135deg, #f5e6d3 0%, #e8d5b7 100%)';

            // Faire tourner doucement les icônes finales
            const icons = scene.querySelectorAll('.final-icons circle');
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.animation = 'spin 2s linear infinite';
                }, index * 200);
            });
        }, 2500);
    }
}

// Démarrer l'animation quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new SchoolDayAnimation();
});

// Ajouter des animations CSS supplémentaires
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);