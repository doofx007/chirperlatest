export default function ApplicationLogoBlack(props) {
    return (
        <img
            {...props}
            src="/images/logo-black.png" // Ensure this matches the correct path
            alt="Application Logo"
            style={{
                width: '100%',       // Make the logo as large as the container
                maxWidth: '400px',   // Limit the maximum size
                height: 'auto',      // Maintain aspect ratio
            }}
        />
    );
}
