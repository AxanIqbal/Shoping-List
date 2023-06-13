import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import {Stack, Typography} from "@mui/material";
import ErrorLottieJson from '../assets/error.json'
import EmptyLottieJson from '../assets/not-found.json'

interface LottieProps {
	animationData: any
	width: number
	height: number
}

export const Lottie = ({ animationData, width, height }: LottieProps) => {
	const element = useRef<HTMLDivElement>(null)
	const lottieInstance = useRef<any>()

	useEffect(() => {
		if (element.current) {
			lottieInstance.current = lottie.loadAnimation({
				animationData,
				container: element.current
			})
		}
		return () => {
			lottieInstance.current?.destroy()
			lottieInstance.current = null
		}
	}, [animationData])

	return <div style={{ width, height }} ref={element}></div>
}

export function ErrorLottie({error}: {error?: string}) {
	return <Stack alignItems={'center'}>
		<Lottie animationData={ErrorLottieJson} width={250} height={250} />
		<Typography>{error ?? "Error!"}</Typography>
	</Stack>
}

export function EmptyLottie({text}: {text?: string}) {
	return <Stack alignItems={'center'}>
		<Lottie animationData={EmptyLottieJson} width={250} height={250} />
		<Typography>{text ?? "Empty!"}</Typography>
	</Stack>
}