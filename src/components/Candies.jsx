import React, { useId, useState, useMemo, useEffect, useRef } from 'react';
import './Candies.css';


const Candy = ({ crossed = false, onClick, baseColor, stripeColor, pulse = false }) => {
	const leftClipId = useId();
	const rightClipId = useId();
	const highlightGradId = useId();
	const shadeGradId = useId();
	const noiseFilterId = useId();
	const fadedClass = crossed ? 'opacity-60' : 'opacity-100';

    // Indivdual Candy
	return (
		<div
			className={`relative inline-flex items-center justify-center px-3 cursor-pointer select-none`}
			onClick={onClick}
			role='button'
			aria-pressed={crossed}
		>
			<div className={`relative rotate-[15deg] ${pulse ? 'candy-pulse' : ''}`}>
				<svg
					className={`absolute -left-2 top-1/2 -translate-y-1/2 h-6 w-3 ${fadedClass}`}
					viewBox='0 0 16 24'
					preserveAspectRatio='none'
					aria-hidden='true'
				>
					<defs>
						<clipPath id={leftClipId}>
							<path d='M16 12 L0 0 C2 4, 2 8, 0 12 C2 16, 2 20, 0 24 Z' />
						</clipPath>
					</defs>
					<path
						d='M16 12 L0 0 C2 4, 2 8, 0 12 C2 16, 2 20, 0 24 Z'
						fill={baseColor}
						stroke={baseColor}
						strokeWidth='1'
					/>
					<g clipPath={`url(#${leftClipId})`}>
						<path d='M0 7 L16 9' stroke={stripeColor} strokeWidth='1.5' strokeLinecap='round' />
						<path d='M0 17 L16 15' stroke={stripeColor} strokeWidth='1.5' strokeLinecap='round' />
					</g>
				</svg>
				<div
					className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border shadow-sm overflow-hidden ${fadedClass}`}
					style={{ backgroundColor: baseColor, borderColor: baseColor }}
				>
					<svg
						className='absolute inset-0 w-full h-full'
						viewBox='0 0 40 40'
						preserveAspectRatio='none'
						aria-hidden='true'
					>
						<defs>
							<radialGradient id={highlightGradId} cx='12' cy='12' r='18' gradientUnits='userSpaceOnUse'>
								<stop offset='0' stopColor='#ffffff' stopOpacity='0.55' />
								<stop offset='1' stopColor='#ffffff' stopOpacity='0' />
							</radialGradient>
							<linearGradient id={shadeGradId} x1='0' y1='0' x2='1' y2='1'>
								<stop offset='0' stopColor='#000000' stopOpacity='0' />
								<stop offset='1' stopColor='#000000' stopOpacity='0.25' />
							</linearGradient>
							<filter id={noiseFilterId} x='-20%' y='-20%' width='140%' height='140%'>
								<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' seed='2' />
								<feColorMatrix type='saturate' values='0' />
							</filter>
						</defs>
						<g transform='rotate(90 20 20)'>
							<path d='M-6 6 C4 1, 36 11, 46 6' stroke={stripeColor} strokeWidth='3' strokeLinecap='round' fill='none' />
							<path d='M-6 20 C8 16, 32 24, 46 20' stroke={stripeColor} strokeWidth='3' strokeLinecap='round' fill='none' />
							<path d='M-6 34 C4 29, 36 39, 46 34' stroke={stripeColor} strokeWidth='3' strokeLinecap='round' fill='none' />
						</g>
						<rect x='0' y='0' width='40' height='40' fill={`url(#${shadeGradId})`} />
						<circle cx='12' cy='12' r='18' fill={`url(#${highlightGradId})`} />
						<rect x='0' y='0' width='40' height='40' filter={`url(#${noiseFilterId})`} opacity='0.06' />
					</svg>
				</div>
				<svg
					className={`absolute -right-2 top-1/2 -translate-y-1/2 h-6 w-3 ${fadedClass}`}
					viewBox='0 0 16 24'
					preserveAspectRatio='none'
					aria-hidden='true'
				>
					<defs>
						<clipPath id={rightClipId}>
							<path d='M0 12 L16 0 C14 4, 14 8, 16 12 C14 16, 14 20, 16 24 Z' />
						</clipPath>
					</defs>
					<path
						d='M0 12 L16 0 C14 4, 14 8, 16 12 C14 16, 14 20, 16 24 Z'
						fill={baseColor}
						stroke={baseColor}
						strokeWidth='1'
					/>
					<g clipPath={`url(#${rightClipId})`}>
						<path d='M0 9 L16 7' stroke={stripeColor} strokeWidth='1.5' strokeLinecap='round' />
						<path d='M0 15 L16 17' stroke={stripeColor} strokeWidth='1.5' strokeLinecap='round' />
					</g>
				</svg>
			</div>
			{crossed && (
				<svg className='absolute translate-y-[-25%] inset-0 z-30 pointer-events-none' viewBox='0 0 100 100' preserveAspectRatio='none' aria-hidden='true'>
					<g transform='translate(50 50) scale(0.75) translate(-50 -50)'>
						<line x1='15' y1='15' x2='85' y2='85' stroke='#000000' strokeWidth='8' strokeLinecap='round' />
						<line x1='85' y1='15' x2='15' y2='85' stroke='#000000' strokeWidth='8' strokeLinecap='round' />
					</g>
				</svg>
			)}
		</div>
	);
};

// Candies Component
const Candies = ({ number = 0, onToggleDelta, pulseTrigger }) => {
	const safeCount = Math.max(0, Math.min(500, Number(number) || 0));
	const [crossedSet, setCrossedSet] = useState(() => new Set());
	const [activePulse, setActivePulse] = useState(false);
    const lastTriggerRef = useRef(pulseTrigger);

	const colorPalettes = useMemo(
		() => [
			{ base: '#2545fa', stripe: '#ffd166' },
			{ base: '#e11d48', stripe: '#fde047' },
			{ base: '#16a34a', stripe: '#a7f3d0' },
			{ base: '#9333ea', stripe: '#f472b6' },
			{ base: '#0ea5e9', stripe: '#fde68a' },
			{ base: '#f59e0b', stripe: '#1f2937' },
		],
		[]
	);
	const { base: baseColor, stripe: stripeColor } = useMemo(
		() => colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
		[colorPalettes]
	);

	useEffect(() => {
		// Only trigger pulse when pulseTrigger changes after initial mount
		if (lastTriggerRef.current === pulseTrigger) return;
		setActivePulse(true);
		const t = setTimeout(() => setActivePulse(false), 1000);
		lastTriggerRef.current = pulseTrigger;
		return () => clearTimeout(t);
	}, [pulseTrigger]);

	const toggleCrossed = (index) => {
		const wasCrossed = crossedSet.has(index);
		setCrossedSet((prev) => {
			const next = new Set(prev);
			if (wasCrossed) {
				next.delete(index);
			} else {
				next.add(index);
			}
			return next;
		});
		if (typeof onToggleDelta === 'function') {
			onToggleDelta(wasCrossed ? 1 : -1);
		}
	};

	const candies = Array.from({ length: safeCount });

	return (
		<div className='w-[100%] h-auto'>
			<div className='flex flex-wrap gap-3 justify-center place-items-center'>
				{candies.map((_, index) => (
					<Candy
						key={index}
						crossed={crossedSet.has(index)}
						onClick={() => toggleCrossed(index)}
						baseColor={baseColor}
						stripeColor={stripeColor}
						pulse={activePulse && !crossedSet.has(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default Candies;