import TravellerNavbar from "@/components/TravellerNavbar";

const TravellerChatDMLayout = (
    {children}
) => {
    return (
        <>
            <TravellerNavbar />
            <div>
                {children}
            </div>
            {/* <FooterPage /> */}
        </>
    )
}

export default TravellerChatDMLayout;