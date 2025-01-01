import HostNavbar from "../../../components/HostNavbar";

const HostLayout = (
    {children}
) => {
    return (
        <>
            <HostNavbar />
            <div>
                {children}
            </div>
            {/* <FooterPage /> */}
        </>
    )
}

export default HostLayout;