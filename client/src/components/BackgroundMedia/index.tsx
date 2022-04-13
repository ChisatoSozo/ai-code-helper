import { Box, CardMedia } from "@mui/material";
import bgImg from "../../assets/images/bgImg.jpg";

const styles = {
    cardMedia: {
        minHeight: '-webkit-fill-available',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
    }
}
export const BackgroundMedia = () => {
    return (
        <Box>
            <CardMedia
                component='img'
                src={bgImg}
                sx={styles.cardMedia}
            />
        </Box>
    )
}