import React, { useState, Suspense } from 'react';
import { Modal, Button, Spin, Skeleton } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type {UpdateMerchantData} from '../../../../utils/commonInterface';
import MerchantFormFields from './components/merchantFormFields';
import {handleOperations} from '../infrastructure/handleOperations';

interface ButtonUpdateMerchantProps {
    merchant: UpdateMerchantData;
    onBack?: () => void;
}

const ButtonUpdateMerchant: React.FC<ButtonUpdateMerchantProps> = ({merchant, onBack}) => {
    const [visible, setVisible] = useState(false);
    const {
        state,
        handleUpdate,
        handleInputChange,
        handleReset,
        initializeUpdateMerchant
    } = handleOperations();

    const handleOpen = () => {
        handleReset();
        initializeUpdateMerchant(merchant);
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        if (onBack) onBack();
    };

    return (
        <>
            <Button
                onClick={() => handleOpen()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                type="default">
                ✏️ Actualizar Comercio
            </Button>
            <Modal
                open={visible}
                onCancel={handleClose}
                footer={null}
                centered
                width={600}
            >
                <Suspense fallback={<div style={{textAlign: 'center', padding: 40}}><Spin size="large" /></div>}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 16}}>
                        <Button
                            type="link"
                            icon={<ArrowLeftOutlined />}
                            onClick={handleClose}
                            style={{marginRight: 8}}
                        >
                            Volver a búsqueda
                        </Button>
                        <span style={{fontWeight: 500, fontSize: 18}}>Actualizar Comercio</span>
                    </div>
                    {state.isUpdating ? (
                        <Skeleton active paragraph={{rows: 4}} />
                    ) : (
                        <MerchantFormFields
                            merchantData={state.updatedMerchant || merchant}
                            onInputChange={handleInputChange}
                            isDisabled={state.isUpdating}
                        />
                    )}
                    <div style={{ textAlign: "right", marginTop: 24 }}>
                        <Button type="primary" onClick={handleUpdate} loading={state.isUpdating}>
                            Guardar cambios
                        </Button>
                    </div>
                </Suspense>
            </Modal>
        </>
    );
}
export default ButtonUpdateMerchant;