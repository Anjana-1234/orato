/**
 * Navbar component for the Orato OS application.
 * Provides navigation links and branding.
 */
export default function Navbar() {
    // List of navigation items to be displayed in the navbar
    const navItems = ['Dashboard', 'History', 'Settings', 'About', 'Profile'];

    return (
        <nav style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"Times New Roman", Times, serif' }}>
            {/* Application Branding / Logo */}
            <h2 style={{ color: '#38bdf8', margin: 0 }}>ORATO OS</h2>

            {/* Navigation Links Container */}
            <div style={{ display: 'flex', gap: '20px' }}>
                {navItems.map((item) => (
                    <button
                        key={item}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: 500, fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>
    );
}