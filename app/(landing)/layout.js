import { FooterPage } from "../../components/Landing/footer";
import { NavbarPage } from "../../components/Landing/LandingNavbar";

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