<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	let live = false;
	let walking = false;
	let left = false;
	let innerWidth: number;
	type Look = 'look_down' | '' | 'look_up';
	let look: Look = '';

	export let size = 64;
	let xmasMode = new Date().getMonth() === 11;

	const birdx = spring(0, { damping: 0.08, stiffness: 0.003, precision: 1 });

	function walkTo(x: number) {
		left = x < $birdx;
		walking = true;
		birdx.set(x).then(() => {
			walking = false;
		});
	}

	onMount(() => {
		live = true;
		birdx.set(innerWidth * Math.random(), { hard: true });

		const evLoop = setInterval(() => {
			if (walking || document.visibilityState === 'hidden') return;

			if (Math.random() < 0.15) {
				const sign = Math.random() < 0.5 ? -1 : 1;
				const amount = Math.random() * (innerWidth * 0.05 + size);
				const x = Math.min(Math.max(0, $birdx + amount * sign), innerWidth - size);

				walkTo(x);
			}

			if (Math.random() > 0.9) {
				look = ['look_down', '', 'look_up'][Math.round(Math.random() * 2 - 1)] as Look;
			}
		}, 250);

		return () => {
			clearInterval(evLoop);
		};
	});
</script>

<svelte:window bind:innerWidth />

{#if live}
	<svg
		data-name="likeswaffels"
		class:walking
		class:left
		xml:space="preserve"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-miterlimit="1.5"
		viewBox="0 0 280 265"
		width={size}
		height={size}
		style:--x="{$birdx}px"
	>
		<desc>Aksel the seagull.</desc>

		<g class="feet" fill="#ffda36" stroke="#737373" stroke-width="5">
			<path d="M125 270c-3 0-5-2-5-5v-45a5 5 0 0 1 10 0v30h20a10 10 0 0 1 0 20h-25 0Z" />
			<path d="M145 270c-3 0-5-2-5-5v-45a5 5 0 0 1 10 0v30h20a10 10 0 0 1 0 20h-25 0Z" />
		</g>
		<path
			class="stjert"
			fill="#f2f2f2"
			stroke="#737373"
			stroke-width="5"
			d="M20 135h140a70 70 0 0 1-140 0Z"
		/>
		<path
			class="body"
			fill="#f2f2f2"
			stroke="#737373"
			stroke-width="5"
			d="M30 120h200a100 100 0 0 1-200 0Z"
		/>
		<g class="head {look}">
			<path
				fill="#ffda36"
				stroke="#737373"
				stroke-width="5"
				d="M230 70v20h30a10 10 0 0 0 0-20h-30Z"
			/>
			<path
				fill="#f2f2f2"
				stroke="#737373"
				stroke-width="5"
				d="M130 120h100V70a50 50 0 0 0-100 0v50Z"
			/>
			<path class="eye" fill="#737373" d="M200 85V65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0Z" />
			{#if xmasMode}
				<path
					fill="#f94144"
					stroke="#737373"
					stroke-width="5"
					d="M130 70s20-40 70-50c0 0-100-43.97-130 60 0 0 30-40 60-10Z"
				/>
				<path
					fill="#fff"
					stroke="#737373"
					stroke-linecap="butt"
					stroke-miterlimit="2"
					stroke-width="5"
					d="M136.094 72.989s18.683-37.736 65.139-46.314c3.683-.681 6.122-4.224 5.442-7.908-.681-3.683-4.224-6.122-7.908-5.442-53.544 9.888-74.861 53.686-74.861 53.686-1.65 3.363-.259 7.433 3.105 9.083 3.363 1.65 7.433.259 9.083-3.105Z"
				/>
				<circle cx="70" cy="80" r="10" fill="#fff" stroke="#737373" stroke-width="5" />
			{/if}
		</g>
		<g class="smallwing">
			<path fill="#c3c3c3" stroke="#737373" stroke-width="5" d="M90 120h140a70 70 0 0 1-140 0Z" />
			<path
				fill="#f2f2f2"
				d="M185 130h20a5 5 0 0 1 0 10h-20a5 5 0 0 1 0-10ZM155 130h10a5 5 0 0 1 0 10h-10a5 5 0 0 1 0-10Z"
			/>
		</g>
	</svg>
{/if}

<style>
	svg {
		position: fixed;
		left: var(--x);
		bottom: 0;
		pointer-events: visibleFill;

		transition: transform 0.2s;
	}
	svg * {
		transform-box: fill-box;
	}
	.left {
		transform: scaleX(-1);
	}

	.walking .smallwing {
		transform-origin: 115% 15%;
		animation: wiggleSmallwing 0.25s infinite ease-out;
	}
	.walking .stjert {
		transform-origin: 100% 1%;
		animation: wiggleStjert 0.3s infinite;
	}

	.walking .feet path:nth-child(1) {
		animation: walking1 0.3s infinite;
	}
	.walking .feet path:nth-child(2) {
		animation: walking2 0.3s infinite;
	}

	.eye {
		transform-origin: center;
	}
	svg:not(.walking) .eye {
		animation: blink 2s 0.5s forwards;
	}

	.head {
		transition: 0.4s ease;
		transform-origin: bottom right;
	}
	.head.look_up {
		transform: translate(-1px, -5px) rotate(-7deg);
	}
	.head.look_down {
		/* transform: translate(-13px, 18px) rotate(-8deg); */
		transform: translate(-3px, 22px) rotate(9deg);
	}

	@keyframes walking1 {
		50% {
			transform: translateX(20px);
		}
	}

	@keyframes walking2 {
		50% {
			transform: translateX(-20px);
		}
	}

	@keyframes wiggleSmallwing {
		40% {
			transform: rotate(4deg) translate(0, -2px);
		}
		80% {
			transform: rotate(-4deg) translate(0, -2px);
		}
	}

	@keyframes wiggleStjert {
		50% {
			transform: translateX(2px);
		}
	}

	@keyframes blink {
		40% {
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(0.1);
		}
		60% {
			transform: scaleY(1);
		}
	}
</style>
