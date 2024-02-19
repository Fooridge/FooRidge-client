import React, { useEffect, useState } from "react";
import '../Location/location.css';

const Location = () => {
    const [state, setState] = useState({
        center: { lat: 37.365264512305174, lng: 127.10676860117488 },
        userLocation: null
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    initializeMap(userLat, userLng);
                    getAddressFromCoordinates(userLat, userLng);
                },
                (error) => {
                    console.error("사용자 위치를 가져오는 중 오류 발생:", error.message);
                    initializeMap(state.center.lat, state.center.lng);
                    getAddressFromCoordinates(state.center.lat, state.center.lng);
                }
            );
        } else {
            console.error("이 브라우저에서는 지오로케이션을 지원하지 않습니다.");
            initializeMap(state.center.lat, state.center.lng);
            getAddressFromCoordinates(state.center.lat, state.center.lng);
        }
    }, [state.center.lat, state.center.lng]);

    const initializeMap = (initialLat, initialLng) => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(initialLat, initialLng),
            level: 3
        };

        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(initialLat, initialLng);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            draggable: true
        });
        marker.setMap(map);

        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            marker.setPosition(mouseEvent.latLng);
            updateMarkerLocation(mouseEvent.latLng);
        });

        window.kakao.maps.event.addListener(marker, 'dragend', function () {
            updateMarkerLocation(marker.getPosition());
        });
    };

    const updateMarkerLocation = (markerPosition) => {
        getAddressFromCoordinates(markerPosition.getLat(), markerPosition.getLng());
    };

    const getAddressFromCoordinates = (lat, lng) => {
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.display_name) {
                    const address = data.display_name;
                    setState(prevState => ({
                        ...prevState,
                        userLocation: { lat, lng, address }
                    }));
                } else {
                    console.error("주소를 찾을 수 없습니다.");
                }
            })
            .catch(error => {
                console.error("주소를 가져오는 중 오류 발생:", error.message);
            });
    };

    const handleSaveLocation = () => {
        if (state.userLocation) {
            console.log("Saved Location:", state.userLocation);
            // Add logic to save the location to your storage or perform any other actions
        } else {
            console.error("Cannot save location. User location is not available.");
        }
    };

    return (
        <div className="location">
            <p>회원가입</p><hr />
            <div className="map" id="map" style={{ width: "328px", height: "480px" }}></div>
            {state.userLocation && (
                <>
                    <h4 className="adress">주소</h4>
                    <div className="get_adress">
                        <p>{state.userLocation.address}</p>
                    </div>
                </>
            )}
            <button className="location_storage" onClick={handleSaveLocation}>
                내 위치 저장
            </button>
        </div>
    );
}

export default Location;