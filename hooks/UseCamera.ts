import { useEffect } from 'react';
import { Camera, useCameraPermissions } from 'expo-camera';

const useCamera = () => {
	const [permission, requestPermission] = useCameraPermissions();

	const requestPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		return requestPermission(status === 'granted');
	};

	const getCameraPermissions = async () => {
		const status = await requestPermissions();
		requestPermission(status === 'granted');
	};

	useEffect(() => {
		getCameraPermissions();
	}, []);

	return { permission, requestPermissions };
};

export default useCamera;