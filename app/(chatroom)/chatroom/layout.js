import TravellerNavbar from "@/components/TravellerNavbar";

const TravellerChatLayout = (
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

export default TravellerChatLayout;