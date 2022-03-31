class _Ease {
    // Sine
        public easeInSine(x: number): number {
            return 1 - Math.cos((x * Math.PI) / 2);
        }
        public easeOutSine(x: number): number {
            return Math.sin((x * Math.PI) / 2);
        }
        public easeInOutSine(x: number): number {
            return -(Math.cos(Math.PI * x) - 1) / 2;
        }

    // Cubic
        public easeInCubic(x: number): number {
            return x * x * x;
        }
        
        public easeOutCubic(x: number): number {
            return 1 - Math.pow(1 - x, 3);
        }
        
        public easeInOutCubic(x: number): number {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

    // Quint
        public easeInQuint(x: number): number {
            return x * x * x * x * x;
        }

        public easeOutQuint(x: number): number {
            return 1 - Math.pow(1 - x, 5);
        }

        public easeInOutQuint(x: number): number {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }

    // Circ
        public easeInCirc(x: number): number {
            return 1 - Math.sqrt(1 - Math.pow(x, 2));
        }

        public easeOutCirc(x: number): number {
            return Math.sqrt(1 - Math.pow(x - 1, 2));
        }

        public easeInOutCirc(x: number): number {
            return x < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        }

    // Elastic
        public easeInElastic(x: number): number {
            const c4 = (2 * Math.PI) / 3;
            
            return x === 0
            ? 0
            : x === 1
            ? 1
            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        }

        public easeOutElastic(x: number): number {
            const c4 = (2 * Math.PI) / 3;
            
            return x === 0
            ? 0
            : x === 1
            ? 1
            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }

        public easeInOutElastic(x: number): number {
            const c5 = (2 * Math.PI) / 4.5;
            
            return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
            : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        }

    // Quad
        public easeInQuad(x: number): number {
            return x * x;
        }

        public easeOutQuad(x: number): number {
            return 1 - (1 - x) * (1 - x);
        }

        public easeInOutQuad(x: number): number {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        }

    // Quart
        public easeInQuart(x: number): number {
            return x * x * x * x;
        }

        public easeOutQuart(x: number): number {
            return 1 - Math.pow(1 - x, 4);
        }

        public easeInOutQuart(x: number): number {
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        }

    // Expo
        public easeInExpo(x: number): number {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
        }

        public easeOutExpo(x: number): number {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        }

        public easeInOutExpo(x: number): number {
            return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
            : (2 - Math.pow(2, -20 * x + 10)) / 2;
        }

    // Back
        public easeInBack(x: number): number {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            
            return c3 * x * x * x - c1 * x * x;
        }

        public easeOutBack(x: number): number {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        }

        public easeInOutBack(x: number): number {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            
            return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        }

    // Bounce
        public easeInBounce(x: number): number {return easeInBounce(x)}
        public easeOutBounce(x: number): number {return easeOutBounce(x)}
        public easeInOutBounce(x: number): number {return easeInOutBounce(x)}
}

const easeInBounce = (x: number): number => {
    return 1 - easeOutBounce(1 - x);
}

const easeOutBounce = (x: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
}

const easeInOutBounce = (x: number): number => {
    return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
}

export const Dash_Ease = new _Ease()