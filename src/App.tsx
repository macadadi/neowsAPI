import { Stack, Text } from '@chakra-ui/react'
import Neows from './neows/page'

function App() {
    return (
        <Stack minH={'100vh'} px={4} py={20} justifyContent={'center'} display={'flex'}>
            <Stack background={'white'} h={50}
                    borderColor='hue-navy.50'
                    borderBottomWidth='1px'
                position={'fixed'}
                mx={2}
                justifyContent={'center'}
                top={0} left={0} right={0} zIndex={1}>
            <Text fontWeight={'800'} fontSize={'x-large'}>NeoWs API</Text>
            </Stack>
            <Neows />
        </Stack>
    )
}

export default App
