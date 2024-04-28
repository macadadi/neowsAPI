import { Box, Text } from "@chakra-ui/react"

function ErrorScreen({ message }: { message: string }) {
    return (
        <Box pt={3} w={'78vw'} textAlign={'center'} height={'10vh'} >
            <Text color={'red'}>{message}</Text>
        </Box>
    )
}

export default ErrorScreen