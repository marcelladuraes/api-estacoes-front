import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    useToast
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, dataEdit, isOpen, onClose,editing,onCreate,onUpdate }) => {
    const [id_estacao, setIdEstacao] = useState(dataEdit.id_estacao || "");
    const [nome_estacao, setNomeEstacao] = useState(dataEdit.nome_estacao || "");
    const [uf, setUf] = useState(dataEdit.uf || "");
    const [data_fundacao, setDataFundacao] = useState(dataEdit.data_fundacao || "");
    const [codigo_wmo, setCodigoWmo] = useState(dataEdit.codigo_wmo || "");
    const [latitude, setLatitude] = useState(dataEdit.latitude || "");
    const [longitude, setLongitude] = useState(dataEdit.longitude || "");
    const [altitude, setAltitude] = useState(dataEdit.altitude || "");
    
    const toast = useToast()

          
   

    const handleSave = () => {
      if (!nome_estacao || !uf || !data_fundacao || !codigo_wmo || !latitude || !longitude || !altitude ){
        toast(
          {
            position: 'top-right',
          title: 'Campos Nulos',
          description: 'Favor preencher todos os campos',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      return
      };

      if (editing) {
        onUpdate({id_estacao, nome_estacao, uf ,data_fundacao,codigo_wmo,latitude,longitude,altitude})
      }else{
        let id = data.length+1;
        onCreate({id_estacao:id, nome_estacao, uf ,data_fundacao,codigo_wmo,latitude,longitude,altitude})
      }
    };
  
    return (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{editing?'Editando Estação : '+id_estacao:'Cadastro de Estação'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl display="flex" flexDir="column" gap={4}>
                  <Box>
                    <FormLabel>Nome Estação</FormLabel>
                    <Input
                      type="text"
                      value={nome_estacao}
                      onChange={(e) => setNomeEstacao(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel>UF</FormLabel>
                    <Input
                      type="text"
                      maxLength="2"
                      isDisabled = {editing}
                      value={uf}
                      onChange={(e) => setUf(e.target.value.toUpperCase().replace(/[^a-zA-Z]+/, ''))}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Data da fundação</FormLabel>
                    <Input
                      type="text"
                      value={data_fundacao}
                      onChange={(e) => setDataFundacao(e.target.value)}
                      required />
                  </Box>
                  <Box>
                    <FormLabel>Cod. WMO</FormLabel>
                    <Input
                      type="text"
                      maxLength="4"
                      value={codigo_wmo}
                      onChange={(e) => setCodigoWmo(e.target.value.toUpperCase())}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Latitude</FormLabel>
                    <Input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Longitude</FormLabel>
                    <Input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Altitude</FormLabel>
                    <Input
                      type="text"
                      value={altitude}
                      onChange={(e) => setAltitude(e.target.value)}
                    />
                  </Box>
                </FormControl>
              </ModalBody>
    
              <ModalFooter justifyContent="start">
                <Button colorScheme="green" mr={3} onClick={handleSave}>
                  SALVAR
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  CANCELAR
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    };
    
    export default ModalComp;
    