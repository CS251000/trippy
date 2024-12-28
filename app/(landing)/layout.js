import { FooterPage } from "./components/footer";
import { NavbarPage } from "./components/Navbar";

const LandingLayout = (
    {children}
) => {
    return (
        <>
            <NavbarPage />
            <div>
                {children}
            </div>
            <FooterPage />
        </>
    )
}

export default LandingLayout;