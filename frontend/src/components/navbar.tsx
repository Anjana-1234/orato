export default function Navbar() {
    // List of navigation items to be displayed in the navbar
    const navItems = ['Dashboard', 'History', 'Settings', 'About', 'Profile'];

    return (
        <nav style={{
            position: 'sticky', // To keep the navigation bar fixed at the top to scroll
            top: '15px', // Vertical offset from the top of the viewport
            margin: '0 auto', // Centers the navbar horizontally
            width: 'calc(100% - 1cm)', // Responsive width with side margins
            zIndex: 1000, // To ensure that the navigation bar remains above other page elements
            padding: '12px 40px', // To provide internal spacing for navigation bar content
            display: 'flex', // Uses flexbox for layout alignment
            justifyContent: 'space-between', // Distributes space between logo and nav items
            alignItems: 'center', // Vertically centers items within the navbar
            backgroundColor: 'hsla(244, 98%, 49%, 0.05)', // Semi-transparent background color
            backdropFilter: 'blur(12px)', // Glassmorphism blur effect
            WebkitBackdropFilter: 'blur(12px)', // Safari support for backdrop filter
            border: '1px solid rgba(91, 63, 176, 0.15)', // Subtle border for definition
            borderRadius: '30px', // Rounded pill-shaped corners
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Soft shadow for depth
            fontFamily: '"Times New Roman", Times, serif' // Serif font for a classic look
        }}>
            <h2 style={{ color: '#1b191bff', margin: 0, fontSize: '22px', fontWeight: 700, letterSpacing: '0.5px' }}>ORATO OS</h2>

            {/* Navigation Links Container */}
            <div style={{ display: 'flex', gap: '25px' }}>
                {navItems.map((item) => (
                    <button
                        key={item}
                        style={{
                            background: 'none', // Removes default button background
                            border: 'none', // Removes default button border
                            color: '#161517ff', // Text color for the links
                            cursor: 'pointer', // Changes cursor to pointer on hover
                            fontSize: '15px', // Font size for navigation text
                            fontWeight: 500, // Medium font weight
                            transition: 'all 0.2s ease', // Smooth transition for hover states
                            fontFamily: 'inherit' // Inherits font from the parent nav
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>
    );
}